<?php

namespace Bga\Games\JohnCompany\EventTiles;

class ForeignInvasion extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Foreign Invasion');
    $this->type = FOREIGN_INVASION;
  }
}
