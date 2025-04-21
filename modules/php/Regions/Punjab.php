<?php

namespace Bga\Games\JohnCompany\Regions;

class Punjab extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PUNJAB;
    $this->name = clienttranslate('Punjab');
    $this->loot = 6;
    $this->adjacentRegionIds = [
      BOMBAY,
      DELHI
    ];
    $this->orderIds = [
      ORDER_PUNJAB_1,
    ];
    $this->adjacentRegionBorderMap = [
      BOMBAY => BOMBAY_PUNJAB_BORDER,
      DELHI => DELHI_PUNJAB_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => BOMBAY,
      CIRCLE => BOMBAY,
      SQUARE => DELHI,
    ];
    $this->adjacentRegionsInClockwiseOrder = [DELHI, BOMBAY];
  }
}
