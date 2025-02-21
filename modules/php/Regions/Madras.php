<?php

namespace Bga\Games\JohnCompany\Regions;

class Madras extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MADRAS;
    $this->loot = 5;
    $this->adjacentRegionIds = [
      HYDERABAD,
      MYSORE
    ];
    $this->exportIcons = 1;
    $this->orderIds = [
      ORDER_MADRAS_1,
      ORDER_MADRAS_2,
    ];
  }
}
