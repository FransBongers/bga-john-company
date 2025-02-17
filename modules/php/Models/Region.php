<?php

namespace Bga\Games\JohnCompany\Models;

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
}
