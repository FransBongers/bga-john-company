<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_15 extends \Bga\Games\JohnCompany\EventTiles\Peace
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_15';
    $this->regionId = MYSORE;
    $this->shape = SQUARE;
  }
}
