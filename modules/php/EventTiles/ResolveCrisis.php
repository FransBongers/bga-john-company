<?php

namespace Bga\Games\JohnCompany\EventTiles;

class ResolveCrisis extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $strength;
  protected $shape;

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Resolve Crisis');
    $this->type = RESOLVE_CRISIS;
  }
}
