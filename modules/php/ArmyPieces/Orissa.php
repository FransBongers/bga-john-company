<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Orissa extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ORISSA;
    $this->name = clienttranslate('Orissa');
    $this->presidencyId = BENGAL_PRESIDENCY;
    $this->cost = 2;
    $this->strength = 1;
  }
}
