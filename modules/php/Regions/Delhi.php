<?php

namespace Bga\Games\JohnCompany\Regions;

class Delhi extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = DELHI;
    $this->loot = 8;
    $this->adjacentRegionIds = [
      PUNJAB,
      BOMBAY,
      MARATHA,
      BENGAL
    ];
    $this->exportIcons = 1;
    $this->orderIds = [
      ORDER_DELHI_1,
      ORDER_DELHI_2
    ];
  }
}
