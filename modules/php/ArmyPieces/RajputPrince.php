<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class RajputPrince extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = RAJPUT_PRINCE;
    $this->name = clienttranslate('Rajput Prince');
    $this->region = BOMBAY;
    $this->cost = 5;
    $this->strength = 3;
    $this->type = LOCAL_ALLIANCE;
  }
}
