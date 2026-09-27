<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Sikhs extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SIKHS;
    $this->name = clienttranslate('Sikhs');
    $this->region = BOMBAY;
    $this->cost = 3;
    $this->strength = 2;
  }
}
