<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_08 extends \Bga\Games\JohnCompany\EventTiles\Windfall
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_08';
    $this->regionId = MADRAS;
  }
}
