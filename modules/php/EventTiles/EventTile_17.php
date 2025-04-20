<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_17 extends \Bga\Games\JohnCompany\EventTiles\Shuffle
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_17';
    $this->regionId = MADRAS;
    $this->shape = CIRCLE;
  }
}
