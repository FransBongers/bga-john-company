<?php

namespace Bga\Games\JohnCompany\EventTiles;

class Leader extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $strength;
  protected $shape;
  
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Leader');
    $this->type = LEADER;
  }
}
