<?php

namespace Bga\Games\JohnCompany\EventTiles;

class Windfall extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Windfall');
    $this->type = WINDFALL;
  }
}
