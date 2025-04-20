<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_05 extends \Bga\Games\JohnCompany\EventTiles\Windfall
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_05';
    $this->regionId = HYDERABAD;
    
  }
}
