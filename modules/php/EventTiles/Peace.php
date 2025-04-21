<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Regions;

class Peace extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $shape;
  protected $bordersConnectedOrdersMap = [
    BENGAL_DELHI_BORDER => [],
    BENGAL_MARATHA_BORDER => [ORDER_BENGAL_1, ORDER_MARATHA_3],
    BOMBAY_DELHI_BORDER => [ORDER_BOMBAY_1, ORDER_DELHI_3],
    BOMBAY_HYDERABAD_BORDER => [],
    BOMBAY_MARATHA_BORDER => [ORDER_BOMBAY_2, ORDER_MARATHA_2],
    BOMBAY_MYSORE_BORDER => [ORDER_BOMBAY_3, ORDER_MYSORE_1],
    BOMBAY_PUNJAB_BORDER => [ORDER_BOMBAY_1, ORDER_PUNJAB_1],
    DELHI_MARATHA_BORDER => [ORDER_DELHI_2, ORDER_MARATHA_1],
    DELHI_PUNJAB_BORDER => [ORDER_DELHI_1, ORDER_PUNJAB_1],
    HYDERABAD_MADRAS_BORDER => [ORDER_HYDERABAD_1, ORDER_MADRAS_1],
    HYDERABAD_MARATHA_BORDER => [ORDER_HYDERABAD_1, ORDER_MARATHA_3],
    HYDERABAD_MYSORE_BORDER => [ORDER_HYDERABAD_1, ORDER_MYSORE_2],
    MADRAS_MYSORE_BORDER => [ORDER_MADRAS_2, ORDER_MYSORE_2],
  ];

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Peace');
    $this->type = PEACE;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);
    $elephantLocation = Elephant::getLocation();

    $isOnBorder = in_array($elephantLocation, BORDERS);
    if ($isOnBorder) {
      $this->openConnectedOrders($elephantLocation);
      $this->addTowerLevels($elephantLocation);
    } else {
      // is in region
      $this->openAllOrdersInRegionAndRemoveUnrest($elephantLocation);
    }
    Elephant::march($this->shape);
  }

  private function addTowerLevels($border)
  {
    $regions = Regions::getAll();

    foreach(BORDERS_CONNECTED_REGIONS_MAP[$border] as $regionId) {
      $region = $regions[$regionId];
      if (!$region->isCompanyControlled()) {
        $region->incTowerLevel(1);
      }
    }
  }

  private function openAllOrdersInRegionAndRemoveUnrest($regionId) 
  {
    $region = Regions::get($regionId);
    $orders = $region->getOrders();
    foreach($orders as $order) {
      if ($order->getStatus() === CLOSED) {
        $order->open();
      }
    }

    $region->removeUnrest();
  }

  private function openConnectedOrders($border)
  {
    $orders = Orders::getAll();

    foreach($this->bordersConnectedOrdersMap[$border] as $orderId) {
      $order = $orders[$orderId];
      if ($order->getStatus() === CLOSED) {
        $order->open();
      }
    }
  }
}
