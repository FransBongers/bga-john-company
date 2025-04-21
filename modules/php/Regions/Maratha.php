<?php

namespace Bga\Games\JohnCompany\Regions;

class Maratha extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MARATHA;
    $this->name = clienttranslate('Maratha');
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
    $this->adjacentRegionBorderMap = [
      BENGAL => BENGAL_MARATHA_BORDER,
      DELHI => DELHI_MARATHA_BORDER,
      HYDERABAD => HYDERABAD_MARATHA_BORDER,
      BOMBAY => BOMBAY_MARATHA_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => BENGAL,
      CIRCLE => BOMBAY,
      SQUARE => DELHI,
    ];
    $this->adjacentRegionsInClockwiseOrder = [HYDERABAD, BOMBAY, DELHI, BENGAL];
  }
}
