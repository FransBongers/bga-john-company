<?php

namespace Bga\Games\JohnCompany\EventTiles;

class Peace extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $shape;
  
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Peace');
    $this->type = PEACE;
  }
}
