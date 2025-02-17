<?php

namespace Bga\Games\JohnCompany\Regions;

class Maratha extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MARATHA;
    $this->loot = 3;
    $this->adjacentRegionIds = [
      BENGAL,
      DELHI,
      BOMBAY,
      HYDERABAD
    ];
    $this->orderIds = [
      ORDER_MARATHA_1,
      ORDER_MARATHA_2,
      ORDER_MARATHA_3,
    ];
  }
}
