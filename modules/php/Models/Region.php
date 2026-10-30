<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ControlTokens;
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
  protected string $governorOfficeId;

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
    'strength' => ['strength', 'int'],
    'unrest' => ['unrest', 'int'],
  ];

  protected $staticAttributes = [
    'loot',
    'adjacentRegionsInClockwiseOrder',
    'adjacentRegionIds',
    'orderIds',
    'exportIcons',
    'name',
    'governorOfficeId',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    unset($data['state']);
    unset($data['location']);
    $data['isCapital'] = $this->isCapital();
    return $data;
  }

  public function getUiData()
  {
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function becomePartOfEmpire(Region $capitalRegion)
  {
    $capitalRegionId = $capitalRegion->getId();
    $this->setControl($capitalRegionId);
    ControlTokens::get('ControlToken_' . $this->getId())->setLocation($capitalRegionId);
    Notifications::regionBecomesPartOfEmpire($this, $capitalRegion);
  }

  public function becomeSovereign()
  {
    $this->setControl(null);
    ControlTokens::get('ControlToken_' . $this->getId())->setLocation($this->getId());
    Notifications::regionBecomesSovereign($this);
  }

  public function incTowerLevel(int $change)
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

  public function getNextAdjacentRegionIdInClockwiseOrder($regionId)
  {
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

  public function addUnrest(Player | null $player, int $change)
  {
    if ($change === 0) {
      return;
    }
    $this->incUnrest($change);
    Notifications::addUnrest($player, $this, $change);
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

    foreach ($this->orderIds as $orderId) {
      $connectedOrders = $orders[$orderId]->getConnectedOrders();
      foreach ($connectedOrders as $connectedOrderId) {
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

  public function openAllOrders()
  {
    $orders = Orders::getMany($this->orderIds);
    foreach ($orders as $orderId => $order) {
      if (!$order->isClosed()) {
        continue;
      }
      $order->open();
    }
  }

  public function closeAllOrders()
  {
    $orders = Orders::getMany($this->orderIds);

    $orderClosed = false;
    foreach ($orders as $orderId => $order) {
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
    foreach ($orders as $orderId => $order) {
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
    for ($i = 0; $i < count($empires); $i++) {
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
    $familyMember = FamilyMembers::getTopOf(Locations::commander($presidency));
    // Should always only be 1
    if ($familyMember !== null) {
      return $familyMember;
    }
    $militaryAffairs = Offices::get(MILITARY_AFFAIRS)->getFamilyMember();
    if ($militaryAffairs !== null) {
      return $militaryAffairs;
    }
    $chairmain = Offices::get(CHAIRMAN)->getFamilyMember();

    return $chairmain;
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
    foreach ($regions as $region) {
      if ($region->getControl() === $this->getId()) {
        $region->becomeSovereign();
      }
    }
  }

  public function companyGainsControl(Player $player, string $presidencyId)
  {
    $previousControl = $this->getControl();
    // Remove tower and check empire
    $this->setStrength(0);
    $this->setControl($presidencyId);
    $controlToken = ControlTokens::getByRegion($this->getId());
    $controlToken->setLocation($presidencyId);
    if ($this->isCapital()) {
      $this->shatterEmpire();
    } else if ($previousControl !== $presidencyId) {
      Notifications::removeTower($player, $this);
    }

    // Open all orders and remove any unrest
    $this->openAllOrders();
    $this->removeUnrest();

    // Form Governorship
    if ($previousControl !== $presidencyId && !Offices::get(GOVERNOR_GENERAL)->isInPlay()) {
      Offices::get($this->getGovernorOfficeId())->moveToVacantOffices($player);
    }
  }

  public function hasClosedOrders(): bool
  {
    $orders = Orders::getMany($this->orderIds)->toArray();

    return Utils::array_some($orders, function ($order) {
      return $order->isClosed();
    });
  }

  public function getControllingPresidencyId(): string | null
  {
    if ($this->isCompanyControlled()) {
      return $this->getControl();
    }
    return null;
  }
}
