<?php

namespace Bga\Games\JohnCompany\Regions;

class Mysore extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MYSORE;
    $this->name = clienttranslate('Mysore');
    $this->loot = 5;
    $this->adjacentRegionIds = [
      BOMBAY,
      HYDERABAD,
      MADRAS
    ];
    $this->orderIds = [
      ORDER_MYSORE_1,
      ORDER_MYSORE_2,
    ];
    $this->adjacentRegionBorderMap = [
      BOMBAY => BOMBAY_MYSORE_BORDER,
      HYDERABAD => HYDERABAD_MYSORE_BORDER,
      MADRAS => MADRAS_MYSORE_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => HYDERABAD,
      CIRCLE => BOMBAY,
      SQUARE => MADRAS,
    ];
    $this->adjacentRegionsInClockwiseOrder = [BOMBAY, HYDERABAD, MADRAS];
  }
}
