<?php

namespace Bga\Games\JohnCompany\Regions;

class Madras extends \Bga\Games\JohnCompany\Models\Region
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MADRAS;
    $this->name = clienttranslate('Madras');
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
    $this->adjacentRegionBorderMap = [
      HYDERABAD => HYDERABAD_MADRAS_BORDER,
      MYSORE => MADRAS_MYSORE_BORDER,
    ];
    $this->shapeAdjacentRegionMap = [
      TRIANGLE => MYSORE,
      CIRCLE => HYDERABAD,
      SQUARE => MYSORE,
    ];
    $this->adjacentRegionsInClockwiseOrder = [MYSORE, HYDERABAD];
  }
}
