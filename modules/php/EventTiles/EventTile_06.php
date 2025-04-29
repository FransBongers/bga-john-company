<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_06 extends \Bga\Games\JohnCompany\EventTiles\Crisis
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_06';
    $this->regionId = BENGAL;
    $this->shape = TRIANGLE;
    $this->strength = 1;
  }
}
