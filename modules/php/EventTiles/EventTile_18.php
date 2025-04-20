<?php

namespace Bga\Games\JohnCompany\EventTiles;

class EventTile_18 extends \Bga\Games\JohnCompany\EventTiles\ForeignInvasion
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EventTile_18';
    $this->regionId = MARATHA;
  }
}
