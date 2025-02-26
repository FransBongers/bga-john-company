<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Arcot extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ARCOT;
    $this->name = clienttranslate('Arcot');
    $this->region = MADRAS;
    $this->cost = 4;
    $this->strength = 2;
    $this->type = LOCAL_ALLIANCE;
  }
}
