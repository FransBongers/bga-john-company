<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Managers\Regions;

class Turmoil extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Turmoil');
    $this->type = TURMOIL;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);

    Regions::get($regionId)->closeNorthernMostOpenOrder();

    Globals::setCascadedRegions([]);
  }
}
