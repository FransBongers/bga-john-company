<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class TheNizam extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = THE_NIZAM;
    $this->name = clienttranslate('The Nizam');
    $this->presidencyId = MADRAS_PRESIDENCY;
    $this->cost = 3;
    $this->strength = 2;
  }
}
