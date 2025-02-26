<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class JagatSeths extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = JAGAT_SETHS;
    $this->name = clienttranslate('Jagat Seths');
    $this->region = BENGAL;
    $this->cost = 4;
    $this->strength = 2;
    $this->type = LOCAL_ALLIANCE;
  }
}
