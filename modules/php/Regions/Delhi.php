<?php

namespace Bga\Games\JohnCompany\Regions;

class Delhi extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = DELHI;
    $this->name = clienttranslate('Delhi');
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
    $this->adjacentRegionBorderMap = [
      BENGAL => BENGAL_DELHI_BORDER,
      BOMBAY => BOMBAY_DELHI_BORDER,
      MARATHA => DELHI_MARATHA_BORDER,
      PUNJAB => DELHI_PUNJAB_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => BENGAL,
      CIRCLE => MARATHA,
      SQUARE => PUNJAB,
    ];
    $this->adjacentRegionsInClockwiseOrder = [BENGAL, MARATHA, BOMBAY, PUNJAB];
  }
}
