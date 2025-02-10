<?php

namespace Bga\Games\JohnCompany\Models;

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

  public function getRegionId()
  {
    return $this->regionId;
  }
}
