<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class PresidencyActions extends \Bga\Games\JohnCompany\Models\AtomicAction
{

  /**
   * - Max orders is equal to number of ships
   * - Orders need to be connected and open
   * - Max number of regions depends on treasury (player needs to roll at least one die)
   */
  public function getOrderOptions($office)
  {
    $shipCount = Ships::countInLocation($office->getSeaZone());

    $orders = Orders::getAll();

    $homePortOrderId = $office->getHomePortOrderId();
    $visited = [
      $homePortOrderId => 1,
    ];
    $queue = [$homePortOrderId];
    // $homePortOrder = $orders[];

    // Get all orders within range
    while (count($queue) > 0) {
      $currentOrderId =  array_shift($queue);

      if ($visited[$currentOrderId] === $shipCount) {
        continue;
      }

      $currentOrder = $orders[$currentOrderId];

      $connectedOrders = $currentOrder->getConnectedOrders();

      foreach($connectedOrders as $connectedOrderId) {
        if (isset($visited[$connectedOrderId])) {
          continue;
        }
        
        $connectedOrder = $orders[$connectedOrderId];

        if ($connectedOrder->getStatus() !== OPEN) {
          continue;
        }

        $queue[] = $connectedOrderId;
        $visited[$connectedOrderId] = $visited[$currentOrderId] + 1;

      }
    }

    $regions = Regions::getAll();

    $possibleOrders = [];
    $possibleRegions = [];
    foreach(array_keys($visited) as $orderId) {
      $possibleOrders[$orderId] = $orders[$orderId];
      $regionId = $orders[$orderId]->getRegionId();
      if (!isset($possibleRegions[$regionId])) {
        $possibleRegions[$regionId] = $regions[$regionId];
      }
    }
    return [
      'orders' => $possibleOrders,
      'regions' => $possibleRegions,
      'homePortOrderId' => $homePortOrderId,
      'homeRegionId' => $office->getRegionId(),
    ];

  }

}
