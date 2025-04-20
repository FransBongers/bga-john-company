<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_07 extends \Bga\Games\JohnCompany\EventTiles\ResolveCrisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_07';
    $this->regionId = MYSORE;
    $this->shape = SQUARE;
    $this->strength = 2;
  }
}
