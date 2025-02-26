<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Orissa extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORISSA;
    $this->name = clienttranslate('Orissa');
    $this->region = BENGAL;
    $this->cost = 2;
    $this->strength = 1;
    $this->type = LOCAL_ALLIANCE;
  }
}
