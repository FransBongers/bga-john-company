<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Player;

class MoveElephant extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_MOVE_ELEPHANT;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsMoveElephant()
  {
    $data = [
      'options' => $this->getLegalOptions()
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

  public function actPassMoveElephant()
  {
    $this->resolveAction(PASS);
  }

  public function actMoveElephant($args)
  {
    self::checkAction('actMoveElephant');
    $playerId = $this->checkPlayer();

    $locationId = $args->locationId;
    $facing = $args->facing;

    $options = $this->getLegalOptions();

    if (!isset($options[$locationId])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_084");
    }
    if (!empty($options[$locationId]) && !in_array($facing, $options[$locationId])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_085");
    }

    Elephant::move($locationId, $facing);

    $this->gainMoneyEqualToHighestOpenOrderInRegionWithTail($playerId, $locationId, $facing);

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

  private function gainMoneyEqualToHighestOpenOrderInRegionWithTail(int $playerId, string $locationId, string | null $facing)
  {
    $regionId = $locationId;
    if (in_array($locationId, BORDERS)) {
      list($regionAId, $regionBId) = explode('_', $locationId);
      $regionId = $facing === $regionAId ? $regionBId : $regionAId;
    }

    $region = Regions::get($regionId);
    $orders = $region->getOrders();

    $highestOpenOrder = 0;
    foreach ($orders as $order) {
      if (!$order->isClosed()) {
        $highestOpenOrder = max($highestOpenOrder, $order->getValue());
      }
    }
    if ($highestOpenOrder > 0) {
      Players::get($playerId)->getFamily()->gainCash($highestOpenOrder);
    } else {
      Notifications::message(
        clienttranslate('No open orders in the region with the Elephant\'s tail.')
      );
    }
  }

  private function getLegalOptions()
  {
    $location = Elephant::getLocation();
    $regions = Regions::getAll();
    $legalOptions = [];
    foreach ($regions as $region) {
      $regionId = $region->getId();
      if ($regionId === $location || !$region->isCompanyControlled()) {
        continue;
      }
      $legalOptions[$regionId] = [];
    }

    foreach (BORDERS as $borderId) {
      if ($borderId === $location) {
        continue;
      }
      list($regionAId, $regionBId) = explode('_', $borderId);
      $regionA = $regions[$regionAId];
      $regionB = $regions[$regionBId];

      if ($regionA->getControl() && $regionB->getControl()) {
        // Either both regions are company controlled, so the border is not a legal option
        // Or both regions are part of the same empire
        continue;
      }

      if ($regionA->getControl() === $regionBId) {
        $legalOptions[$borderId] = [$regionBId];
      } else if ($regionB->getControl() === $regionAId) {
        $legalOptions[$borderId] = [$regionAId];
      } else if ($regionA->isCompanyControlled()) {
        $legalOptions[$borderId] = [$regionAId];
      } else if ($regionB->isCompanyControlled()) {
        $legalOptions[$borderId] = [$regionBId];
      } else {
        $legalOptions[$borderId] = [$regionAId, $regionBId];
      }
    }
    return $legalOptions;
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
    return clienttranslate('Move Elephant');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
