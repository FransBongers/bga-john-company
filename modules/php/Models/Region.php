<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Regions;

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
    $data['isCapital'] = in_array($this->id, Globals::getEmpires());
    return $data;
  }

  public function getUiData()
  {
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function becomePartOfEmpire($capitalRegion)
  {
    $this->setControl($capitalRegion->getId());
    Notifications::regionBecomesPartOfEmpire($this, $capitalRegion);
  }

  public function becomeSovereign()
  {
    $this->setControl(null);
    Notifications::regionBecomesSovereign($this);
  }

  public function incTowerLevel($change)
  {
    if ($this->strength === 0 && $change < 0) {
      return;
    }
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

  public function isCapital()
  {
    return in_array($this->id, Globals::getEmpires());
  }

  public function isCompanyControlled()
  {
    return in_array($this->control, PRESIDENCIES);
  }

  public function isDominatedByRegion()
  {
    return in_array($this->control, REGIONS);
  }

  public function isSovereign()
  {
    return $this->control === null;
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

  public function closeAllOrders()
  {
    $orders = Orders::getMany($this->orderIds);

    $orderClosed = false;
    foreach($orders as $orderId => $order) {
      if ($order->isClosed()) {
        continue;
      }
      $order->close();
      $orderClosed = true;
    }

    if (!$orderClosed) {
      $this->cascade();
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

  public function formEmpire()
  {
    $empires = Globals::getEmpires();
    $empireCreated = false;
    for($i = 0; $i < count($empires); $i++) {
      if ($empires[$i] !== null) {
        continue;
      }

      $empires[$i] = $this->getId();
      $empireCreated = true;
      Globals::setEmpires($empires);
      break;
    }

    if ($empireCreated) {
      Notifications::formEmpire($this);
    } else {
      Notifications::message(clienttranslate('A new empire cannot be formed'));
    }
    return $empireCreated;
  }

  /**
   * @return FamilyMember
   */
  public function getActingCommander()
  {
    $presidency = $this->getControl();
    $familyMembers = FamilyMembers::getInLocation(Locations::commander(PRESIDENCY_HOME_REGION_MAP[$presidency]))->toArray();
    // Should always only be 1
    if (count($familyMembers) > 0) {
      return $familyMembers[0];
    }
    $militaryAffairs = Offices::get(MILITARY_AFFAIRS)->getFamilyMember();
    if ($militaryAffairs !== null) {
      return $militaryAffairs;
    }
    return Offices::get(CHAIRMAN)->getFamilyMember();
  }

  public function shatterEmpire()
  {
    Notifications::shatterEmpire($this);

    $empires = Globals::getEmpires();
    $index = Utils::array_find_index($empires, function ($regionId) {
      return $regionId === $this->getId();
    });
    $empires[$index] = null;
    Globals::setEmpires($empires);

    $regions = Regions::getAll();
    foreach($regions as $region) {
      if ($region->getControl() === $this->getId()) {
        $region->becomeSovereign();
      }
    }
  }
}
