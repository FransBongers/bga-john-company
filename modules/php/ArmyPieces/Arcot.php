<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Arcot extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ARCOT;
    $this->name = clienttranslate('Arcot');
    $this->presidencyId = MADRAS_PRESIDENCY;
    $this->cost = 4;
    $this->strength = 2;
  }
}
