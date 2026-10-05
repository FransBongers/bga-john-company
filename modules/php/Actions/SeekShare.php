<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\Player;

class SeekShare extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_SEEK_SHARE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsSeekShare()
  {
    $args = $this->ctx->getArgs();
    $source = $args['source'];
    $familyId = $args['familyId'];
    $family = Families::get($familyId);

    $data = [
      'options' => $this->getOptions($family),
      'source' => $source,
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

  public function actPassSeekShare()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actSeekShare($args)
  {
    self::checkAction('actSeekShare');
    $playerId = $this->checkPlayer();

    $position = $args->position;

    $stateArgs = $this->argsSeekShare();

    if (!isset($position, $stateArgs['options'])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_005");
    }

    $price = $stateArgs['options'][$position];

    $this->performAction($playerId, $position, $price);

    if ($stateArgs[SOURCE] === FAMILY_ACTION) {
      $familyId = $this->ctx->getArgs()['familyId'];
      $family = Families::get($familyId);

      $this->checkExtraActionOpportunityMarker($family, $playerId);

      $family->updateOpportunityMarker(SEEK_SHARE);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  public function performAction($playerId, $position, $price)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

    $family->pay($price);

    $familyMember = FamilyMembers::getMemberFor($family->getId());
    $familyMember->setLocation($position);

    Notifications::seekShare($player, $familyMember, $price);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkExtraActionOpportunityMarker(Family $family, int $playerId)
  {
    $opportunityMarker = $family->getOpportunityMarker();
    if ($opportunityMarker !== SEEK_SHARE) {
      return;
    }

    $isDoable = $this->canBePerformedBy($family);
    if (!$isDoable) {
      Notifications::message(clienttranslate('${player_name} cannot seek another share'), []);
    }

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => SEEK_SHARE,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'optional' => true,
      'args' => [
        'familyId' => $family->getId(),
        'playerId' => $playerId,
        SOURCE => OPPORTUNITY_MARKER,
      ]
    ]));
  }

  private function getStockPrice($stockExchangeLocation)
  {
    return intval(explode('_', $stockExchangeLocation)[1]);
  }

  public function canBePerformedBy($family)
  {
    return count($this->getOptions($family)) > 0;
  }

  public function getOptions(Family $family)
  {
    $treasury = $family->getTreasury();

    $membersOnStockExchange = FamilyMembers::getOnStockExchange();

    $options = [];

    foreach (STOCK_EXCHANGE_POSITIONS as $location) {
      if (Utils::array_some($membersOnStockExchange, function ($member) use ($location) {
        return $member->getLocation() === $location;
      })) {
        continue;
      }
      $price = $this->getStockPrice($location);
      if ($price <= $treasury) {
        $options[$location] = $price;
      }
    }

    return $options;
  }

  // ..######..########...#######..##......##.##....##
  // .##....##.##.....##.##.....##.##..##..##.###...##
  // .##.......##.....##.##.....##.##..##..##.####..##
  // .##.......########..##.....##.##..##..##.##.##.##
  // .##.......##...##...##.....##.##..##..##.##..####
  // .##....##.##....##..##.....##.##..##..##.##...###
  // ..######..##.....##..#######...###..###..##....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function performCrownAction()
  {
    $family = Families::get(CROWN);

    $options = $this->getOptions($family);

    $cheapest = 100;
    $position = null;

    foreach (STOCK_EXCHANGE_POSITIONS as $sePosition) {
      if (isset($options[$sePosition]) && $options[$sePosition] < $cheapest) {
        $position = $sePosition;
        $cheapest = $options[$sePosition];
      }
    }

    $this->performAction(CROWN_PLAYER_ID, $position, $cheapest);
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
    return [
      'log' => clienttranslate('Seek Share ${tkn_icon}'),
      'args' => [
        'tkn_icon' => SHARE,
      ],
    ];
  }

  public function isDoable(Player $player): bool
  {
    $args = $this->ctx->getArgs();
    $familyId = $args['familyId'];
    $family = Families::get($familyId);

    return count($this->getOptions($family)) > 0;
  }
}
