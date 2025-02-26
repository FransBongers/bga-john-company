<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

use Bga\Games\JohnCompany\Managers\Ships;

class Sikhs extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SIKHS;
    $this->name = clienttranslate('Sikhs');
    $this->region = BOMBAY;
    $this->cost = 3;
    $this->strength = 2;
    $this->type = LOCAL_ALLIANCE;
  }
}
