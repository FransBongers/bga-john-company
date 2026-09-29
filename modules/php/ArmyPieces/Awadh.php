<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Awadh extends \Bga\Games\JohnCompany\ArmyPieces\LocalAlliance
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = AWADH;
    $this->name = clienttranslate('Awadh');
    $this->presidencyId = BENGAL_PRESIDENCY;
    $this->cost = 4;
    $this->strength = 2;
  }
}
