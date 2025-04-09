<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Regions;

class Order extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'orders';
  protected $primary = 'order_id';
  protected $location;
  protected $state;
  protected $status = OPEN;
  protected $homePort = null;
  protected $northernPriority;
  protected $value;
  protected $filledValue;
  protected $regionId;
  protected $connectedOrders;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['order_id', 'str'],
    'location' => 'order_location',
    'state' => ['order_state', 'int'],
    'status' => ['status', 'str'],
  ];

  protected $staticAttributes = [
    'northernPriority',
    'homePort',
    'value',
    'filledValue',
    'regionId',
    'connectedOrders',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    return $data;
  }

  public function getUiData()
  {
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function getRegion()
  {
    return Regions::get($this->regionId);
  }

  public function getRegionId()
  {
    return $this->regionId;
  }

  public function close($player)
  {
    $this->setStatus(CLOSED);
    Notifications::changeOrderStatus($player, $this, CLOSED);
  }

  public function fill($player, $familyMember = null)
  {
    $from = null;
    if ($familyMember !== null) {
      $from = $familyMember->getLocation();
      $familyMember->setLocation($this->getId());
      $this->setStatus(FILLED_BY_WRITER);
    } else {
      $this->setStatus(FILLED);
    }

    Notifications::fillOrder($player, $this, $familyMember !== null, $familyMember, $from);
  }

  public function open($player)
  {
    $this->setStatus(OPEN);
    Notifications::changeOrderStatus($player, $this, OPEN);
  }
}
