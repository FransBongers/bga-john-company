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
  }
}
