<?php

namespace Bga\Games\JohnCompany\Regions;

class Hyderabad extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = HYDERABAD;
    $this->name = clienttranslate('Hyderabad');
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
    $this->adjacentRegionBorderMap = [
      BOMBAY => BOMBAY_HYDERABAD_BORDER,
      MADRAS => HYDERABAD_MADRAS_BORDER,
      MARATHA => HYDERABAD_MARATHA_BORDER,
      MYSORE => HYDERABAD_MYSORE_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => MARATHA,
      CIRCLE => MADRAS,
      SQUARE => BOMBAY,
    ];
    $this->adjacentRegionsInClockwiseOrder = [MADRAS, MYSORE, BOMBAY, MARATHA];
  }
}
