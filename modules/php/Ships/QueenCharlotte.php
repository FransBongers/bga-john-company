<?php

namespace Bga\Games\JohnCompany\Ships;

class QueenCharlotte extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = QUEEN_CHARLOTTE;
    $this->name = clienttranslate('QueenCharlotte');
  }
}
