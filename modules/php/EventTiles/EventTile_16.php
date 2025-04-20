<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_16 extends \Bga\Games\JohnCompany\EventTiles\Peace
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_16';
    $this->regionId = MADRAS;
    $this->shape = TRIANGLE;
  }

  // public function resolveEvent($regionId)
  // {
    
  // }
}
