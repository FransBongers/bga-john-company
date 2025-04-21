<?php

namespace Bga\Games\JohnCompany\Regions;

class Bombay extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = BOMBAY;
    $this->name = clienttranslate('Bombay');
    $this->loot = 4;
    $this->adjacentRegionIds = [
      PUNJAB,
      DELHI,
      MARATHA,
      HYDERABAD,
      MYSORE
    ];
    $this->orderIds = [
      ORDER_BOMBAY_1,
      ORDER_BOMBAY_2,
      ORDER_BOMBAY_3
    ];
    $this->adjacentRegionBorderMap = [
      DELHI => BOMBAY_DELHI_BORDER,
      HYDERABAD => BOMBAY_HYDERABAD_BORDER,
      MARATHA => BOMBAY_MARATHA_BORDER,
      MYSORE => BOMBAY_MYSORE_BORDER,
      PUNJAB => BOMBAY_PUNJAB_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => PUNJAB,
      CIRCLE => MARATHA,
      SQUARE => HYDERABAD,
    ];
    $this->adjacentRegionsInClockwiseOrder = [PUNJAB, DELHI, MARATHA, HYDERABAD, MYSORE];
  }
}
