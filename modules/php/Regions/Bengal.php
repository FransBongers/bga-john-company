<?php

namespace Bga\Games\JohnCompany\Regions;

class Bengal extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = BENGAL;
    $this->name = clienttranslate('Bengal');
    $this->loot = 6;
    $this->adjacentRegionIds = [
      DELHI,
      MARATHA,
    ];
    $this->exportIcons = 2;
    $this->orderIds = [
      ORDER_BENGAL_1,
      ORDER_BENGAL_2,
    ];
  }
}
