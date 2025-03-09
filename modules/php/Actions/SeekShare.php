<?php

namespace Bga\Games\JohnCompany\Actions;


use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

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
    $info = $this->ctx->getInfo();
    $playerId = $info['activePlayerIds'][0];
    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();
    $family = Families::get($familyId);

    $data = [
      'activePlayerIds' => [$playerId],
      'options' => $this->getOptions($family),
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
      throw new \feException("ERROR_005");
    }

    $price = $stateArgs['options'][$position];

    $this->performAction($playerId, $position, $price);

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

    // TODO: insert extra actions

  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getStockPrice($stockExchangeLocation)
  {
    return intval(explode('_', $stockExchangeLocation)[1]);
  }

  public function canBePerformedBy($family)
  {
    return count($this->getOptions($family)) > 0;
  }

  public function getOptions($family)
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
}
