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
    $this->adjacentRegionBorderMap = [
      DELHI => BENGAL_DELHI_BORDER,
      MARATHA => BENGAL_MARATHA_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => DELHI,
      SQUARE => DELHI,
      CIRCLE => MARATHA,
    ];
    $this->adjacentRegionsInClockwiseOrder = [DELHI, MARATHA];
  }
}
