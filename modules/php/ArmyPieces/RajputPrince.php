<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class RajputPrince extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = RAJPUT_PRINCE;
    $this->name = clienttranslate('Rajput Prince');
    $this->presidencyId = BOMBAY_PRESIDENCY;
    $this->cost = 5;
    $this->strength = 3;
  }
}
