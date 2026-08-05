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
use Bga\Games\JohnCompany\Utils\TradeRoutes;

class PresidencyActions extends \Bga\Games\JohnCompany\Models\AtomicAction
{

  /**
   * - Max orders is equal to number of ships
   * - Orders need to be connected and open
   * - Max number of regions depends on treasury (player needs to roll at least one die)
   */
  public function getOrderOptions($office, $regionIds = null)
  {
    $shipCount = Ships::countInLocation($office->getSeaZone());

    $homePortOrderId = $office->getHomePortOrderId();

    $tradeRoute = TradeRoutes::getOrdersForTradeRoute($homePortOrderId, $shipCount, $regionIds);

    return [
      'orders' => $tradeRoute['orders'],
      'regions' => $tradeRoute['regions'],
      'homePortOrderId' => $homePortOrderId,
      'homeRegionId' => $office->getRegionId(),
      'shipCount' => $shipCount,
    ];
  }
}
