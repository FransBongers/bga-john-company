<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_10 extends \Bga\Games\JohnCompany\EventTiles\Turmoil
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_10';
    $this->regionId = PUNJAB;
  }
}
