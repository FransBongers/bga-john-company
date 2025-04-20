<?php

namespace Bga\Games\JohnCompany\EventTiles;

class Turmoil extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Turmoil');
    $this->type = TURMOIL;
  }
}
