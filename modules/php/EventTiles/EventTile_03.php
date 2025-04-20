<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_03 extends \Bga\Games\JohnCompany\EventTiles\ResolveCrisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_03';
    $this->regionId = MARATHA;
    $this->shape = CIRCLE;
    $this->strength = 3;
  }
}
