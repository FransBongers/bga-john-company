<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_13 extends \Bga\Games\JohnCompany\EventTiles\Leader
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_13';
    $this->regionId = HYDERABAD;
    $this->shape = TRIANGLE;
    $this->strength = 4;
  }
}
