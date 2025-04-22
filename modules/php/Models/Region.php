<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Orders;

class Region extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'regions';
  protected $primary = 'region_id';
  protected $location;
  protected $state;
  protected $control;
  protected $looted;
  protected $strength;
  protected $unrest;
  // static
  protected $loot;
  protected $adjacentRegionIds;
  protected $orderIds;
  protected $exportIcons = 0;
  protected $name;
  protected $adjacentRegionBorderMap = [];
  protected $shapeAdjacentRegionMap = [];
  protected $adjacentRegionsInClockwiseOrder = [];

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['region_id', 'str'],
    'location' => 'region_location',
    'state' => ['region_state', 'int'],
    'control' => ['control', 'str'],
    'looted' => ['looted', 'int'],
    'strength' => ['strength', 'int'],
    'unrest' => ['unrest', 'int'],
  ];

  protected $staticAttributes = [
    'loot',
    'adjacentRegionIds',
    'orderIds',
    'exportIcons',
    'name',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    unset($data['state']);
    unset($data['location']);
    $data['looted'] = $this->looted === 1;
    return $data;
  }

  public function getUiData()
  {
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function incTowerLevel($change)
  {
    $this->incStrength($change);
    Notifications::updateTowerLevel($this, $change);
  }

  public function getAdjacentRegionIdByShape($shape)
  {
    return $this->shapeAdjacentRegionMap[$shape];
  }

  public function getNextAdjacentRegionIdInClockwiseOrder($regionId) {
    $index = Utils::array_find_index($this->adjacentRegionsInClockwiseOrder, function ($adjacentRegionId) use ($regionId) {
      return $adjacentRegionId === $regionId;
    });
    if ($index === count($this->adjacentRegionsInClockwiseOrder) - 1) {
      return $this->adjacentRegionsInClockwiseOrder[0];
    } else {
      return $this->adjacentRegionsInClockwiseOrder[$index + 1];
    }
  }

  public function getBorderWith($regionId)
  {
    if (isset($this->adjacentRegionBorderMap[$regionId])) {
      return $this->adjacentRegionBorderMap[$regionId];
    }
    return null;
  }

  public function getOrders()
  {
    return Utils::filter(Orders::getAll()->toArray(), function ($order) {
      return $order->getRegionId() === $this->id;
    });
  }

  public function isCompanyControlled()
  {
    return in_array($this->control, PRESIDENCIES);
  }

  public function isDominatedByRegion()
  {
    return in_array($this->control, REGIONS);
  }

  public function removeUnrest()
  {
    if ($this->unrest === 0) {
      return;
    }
    $this->setUnrest(0);
    Notifications::removeUnrest($this);
  }

  public function cascade()
  {
    $cascadedRegions = Globals::getCascadedRegions();
    if (in_array($this->id, $cascadedRegions)) {
      // Region already cascaded
      return;
    }
    Notifications::message(clienttranslate('A Cascade occurs in ${tkn_boldText_region}'), [
      'tkn_boldText_region' => $this->getName(),
      'i18n' => ['tkn_boldText_region'],
    ]);
    $cascadedRegions[] = $this->id;
    Globals::setCascadedRegions($cascadedRegions);

    $orders = Orders::getAll();

    foreach($this->orderIds as $orderId) {
      $connectedOrders = $orders[$orderId]->getConnectedOrders();
      foreach($connectedOrders as $connectedOrderId) {
        if (in_array($connectedOrderId, $this->orderIds)) {
          // Order is connected order in the same region;
          continue;
        }

        $connectedOrder = $orders[$connectedOrderId];
        if ($connectedOrder->isClosed()) {
          $region = $connectedOrder->getRegion();
          $region->closeNorthernMostOpenOrder();
        } else {
          $connectedOrder->close();
        }
      }
    }
  }

  public function closeNorthernMostOpenOrder()
  {
    // Order ids for each region are listed from north to south
    $orders = Orders::getMany($this->orderIds);

    $orderClosed = false;
    foreach($orders as $orderId => $order) {
      if ($order->isClosed()) {
        continue;
      }
      $order->close();
      $orderClosed = true;
      break;
    }

    if (!$orderClosed) {
      $this->cascade();
    }
  }
}
