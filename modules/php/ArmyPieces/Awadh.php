<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

class Awadh extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = AWADH;
    $this->name = clienttranslate('Awadh');
    $this->region = BENGAL;
    $this->cost = 4;
    $this->strength = 2;
    $this->type = LOCAL_ALLIANCE;
  }
}
