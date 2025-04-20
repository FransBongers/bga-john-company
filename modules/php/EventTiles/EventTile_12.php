<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_12 extends \Bga\Games\JohnCompany\EventTiles\Turmoil
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_12';
    $this->regionId = BOMBAY;
  }
}
