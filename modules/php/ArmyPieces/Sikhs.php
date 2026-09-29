<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Sikhs extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SIKHS;
    $this->name = clienttranslate('Sikhs');
    $this->presidencyId = BOMBAY_PRESIDENCY;
    $this->cost = 3;
    $this->strength = 2;
  }
}
