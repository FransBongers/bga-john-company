<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_14 extends \Bga\Games\JohnCompany\EventTiles\Leader
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_14';
    $this->regionId = BENGAL;
    $this->shape = TRIANGLE;
    $this->strength = 2;
  }
}
