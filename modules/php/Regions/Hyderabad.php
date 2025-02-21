<?php

namespace Bga\Games\JohnCompany\Regions;

class Hyderabad extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = HYDERABAD;
    $this->loot = 7;
    $this->adjacentRegionIds = [
      MADRAS,
      MYSORE,
      BOMBAY,
      MARATHA
    ];
    $this->exportIcons = 1;
    $this->orderIds = [
      ORDER_HYDERABAD_1,
    ];
  }
}
