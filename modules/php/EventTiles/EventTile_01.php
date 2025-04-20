<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_01 extends \Bga\Games\JohnCompany\EventTiles\ResolveCrisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_01';
    $this->regionId = DELHI;
    $this->shape = TRIANGLE;
    $this->strength = 0;
  }
}
