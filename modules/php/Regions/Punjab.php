<?php

namespace Bga\Games\JohnCompany\Regions;

class Punjab extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PUNJAB;
    $this->loot = 6;
    $this->adjacentRegionIds = [
      BOMBAY,
      DELHI
    ];
    $this->orderIds = [
      ORDER_PUNJAB_1,
    ];
  }
}
