<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class TheNizam extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = THE_NIZAM;
    $this->name = clienttranslate('TheNizam');
    $this->region = MADRAS;
    $this->cost = 3;
    $this->strength = 2;
    $this->type = LOCAL_ALLIANCE;
  }
}
