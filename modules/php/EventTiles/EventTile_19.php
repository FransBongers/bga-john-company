<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_19 extends \Bga\Games\JohnCompany\EventTiles\Leader
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_19';
    $this->regionId = PUNJAB;
    $this->shape = CIRCLE;
    $this->strength = 3;
  }
}
