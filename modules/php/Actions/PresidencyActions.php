<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Utils\TradeRoutes;

class PresidencyActions extends \Bga\Games\JohnCompany\Models\AtomicAction
{

  /**
   * - Max orders is equal to number of ships
   * - Orders need to be connected and open
   * - Max number of regions depends on treasury (player needs to roll at least one die)
   */
  public function getOrderOptions(Office $office, $regionIds = null)
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
