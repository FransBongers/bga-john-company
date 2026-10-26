<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\LawCard;
use Bga\Games\JohnCompany\Models\Player;

class ParliamentMeetsSelectLaw extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_SELECT_LAW;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsParliamentMeetsSelectLaw()
  {
    $args = $this->ctx->getArgs();

    $mustSelect = $args['mustSelect'] ?? false;
    $revealedLaws = LawCards::getInLocationOrdered(Locations::revealedLaws())->toArray();

    $data = [
      'revealedLaws' => $revealedLaws,
      'policyOptions' => $this->getPolicyOptionsForRevealedLaws($revealedLaws),
      DIAL => Parliament::getDialPosition(),
      'mustSelect' => $mustSelect
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassParliamentMeetsSelectLaw()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actParliamentMeetsSelectLaw($args)
  {
    self::checkAction('actParliamentMeetsSelectLaw');
    $playerId = $this->checkPlayer();

    $draw = $args->draw ?? false;
    $lawCardId = $args->lawCardId ?? null;

    $stateArgs = $this->argsParliamentMeetsSelectLaw();
    $player = Players::get($playerId);

    if ($draw && $stateArgs['mustSelect']) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_075");
    } else if ($draw && count($stateArgs['revealedLaws']) >= 3) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_058");
    } else if ($draw) {
      $this->drawAndRevealLaw($player);
    } else {
      $law = Utils::array_find($stateArgs['revealedLaws'], fn($law) => $law->getId() === $lawCardId);
      if ($law === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_059");
      }
      $this->selectLaw($player, $law);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getPolicyOptionsForRevealedLaws(array $revealedLaws)
  {
    $result = [];
    foreach ($revealedLaws as $law) {
      list($left, $right) = Parliament::getPolicyOptions($law->getPolicyTarget(), $law->getPolicyConsequence());
      $result[$law->getId()] = [

        'left' => $left,
        'right' => $right,
      ];
    }
    return $result;
  }

  private function drawAndRevealLaw(Player $player)
  {
    $law = LawCards::getTopOf(DECK);
    $law->reveal($player);

    if ($law->getId() === OLD_IDEAS_MADE_NEW_ID && LawCards::countInLocation(DISCARD) === 0) {
      Notifications::message(clienttranslate('No cards in the discard pile'));
      $law->returnToDeck($player);
      $this->drawAndRevealLaw($player);
      return;
    } else if ($law->getId() === OLD_IDEAS_MADE_NEW_ID) {
      $law->resolveImmediateEffects($this->ctx, true);
      return;
    } else if ($law->isDilemma()) {
      $this->selectLaw($player, $law);
      return;
    }

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => PARLIAMENT_MEETS_SELECT_LAW,
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()],
    ]));
  }

  private function selectLaw(Player $player, LawCard $law)
  {
    $law->select($player);

    LawCards::moveAllInLocation(Locations::revealedLaws(), DISCARD);
    Parliament::setSupport($law->getInitialSupport());
    Parliament::setSelectingLaw(false);

    if ($law->getId() === PUBLIC_DEMANDS_IMPEACHMENT_ID) {
      $this->insertSelectOfficeHolderNode();
    }
  }

  private function insertSelectOfficeHolderNode()
  {
    $offices = Utils::filter(Offices::getAll()->toArray(), function ($office) {
      return $office->isInPlay();
    });

    $playerId = Parliament::getPrimeMinisterPlayerId();
    $this->ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_XOR,
      'children' => array_map(function ($office) use ($playerId) {
        return [
          'action' => SELECT_OFFICE_HOLDER,
          'args' => [
            'officeId' => $office->getId(),
            'actingPlayerId' => $playerId,
            'source' => PUBLIC_DEMANDS_IMPEACHMENT_ID
          ]
        ];
      }, $offices),
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Public Demands Impeachment!: ${you} must select an Office'),
        'description' => clienttranslate('Public Demands Impeachment!: ${actplayer} must select an Office'),
      ],
    ]));
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('Prime Minister selects a law');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
