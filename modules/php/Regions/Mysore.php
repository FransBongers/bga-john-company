<?php

namespace Bga\Games\JohnCompany\Regions;

class Mysore extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MYSORE;
    $this->loot = 5;
    $this->adjacentRegionIds = [
      BOMBAY,
      HYDERABAD,
      MADRAS
    ];
    $this->orderIds = [
      ORDER_MYSORE_1,
      ORDER_MYSORE_2,
    ];
  }
}
