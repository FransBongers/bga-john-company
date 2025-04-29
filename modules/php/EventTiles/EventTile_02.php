<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_02 extends \Bga\Games\JohnCompany\EventTiles\Crisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_02';
    $this->regionId = PUNJAB;
    $this->shape = CIRCLE;
    $this->strength = -1;
  }
}
