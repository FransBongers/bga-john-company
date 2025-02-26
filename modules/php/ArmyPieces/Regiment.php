<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

use Bga\Games\JohnCompany\Managers\Ships;

class Regiment extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->name = clienttranslate('Regiment');
    $this->type = REGIMENT;
  }
}
