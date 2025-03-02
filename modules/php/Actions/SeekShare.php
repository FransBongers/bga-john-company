<?php

namespace Bga\Games\JohnCompany\Actions;


use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

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
    $playerId = $info['activePlayerId'];

    $data = [
      'playerId' => $playerId,
      'options' => $this->getOptions($playerId),
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

    $player = Players::get($playerId);
    $family = $player->getFamily();

    $family->pay($price);

    $familyMember = FamilyMembers::getMemberFor($family->getId());
    $familyMember->setLocation($position);

    Notifications::seekShare($player, $familyMember, $price);

    // TODO: insert extra actions



    $this->resolveAction([], true);
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

  public function getOptions($playerId)
  {
    $player = Players::get($playerId);
    $family = $player->getFamily();

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
}
