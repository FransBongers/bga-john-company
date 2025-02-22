<?php

namespace Bga\Games\JohnCompany\Ships;

class Fortitude extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = FORTITUDE;
    $this->name = clienttranslate('Fortitude');
  }
}
