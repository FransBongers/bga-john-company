<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_04 extends \Bga\Games\JohnCompany\EventTiles\ResolveCrisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_04';
    $this->regionId = BOMBAY;
    $this->shape = SQUARE;
    $this->strength = 1;
  }
}
