<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_20 extends \Bga\Games\JohnCompany\EventTiles\Leader
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_20';
    $this->regionId = BOMBAY;
    $this->shape = SQUARE;
    $this->strength = 2;
  }
}
