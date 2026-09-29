<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class JagatSeths extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = JAGAT_SETHS;
    $this->name = clienttranslate('Jagat Seths');
    $this->presidencyId = BENGAL_PRESIDENCY;
    $this->cost = 4;
    $this->strength = 2;
  }
}
