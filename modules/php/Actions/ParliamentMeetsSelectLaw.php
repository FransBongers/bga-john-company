<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
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

    $revealedLaws = LawCards::getInLocationOrdered(Locations::revealedLaws())->toArray();

    $data = [
      'revealedLaws' => $revealedLaws,
      'policyOptions' => $this->getPolicyOptionsForRevealedLaws($revealedLaws),
      DIAL => Parliament::getDialPosition()
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

    if ($draw && count($stateArgs['revealedLaws']) >= 3) {
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

    if ($law->isDilemma()) {
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
