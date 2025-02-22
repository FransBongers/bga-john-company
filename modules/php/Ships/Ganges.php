<?php

namespace Bga\Games\JohnCompany\Ships;

class Ganges extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GANGES;
    $this->name = clienttranslate('Ganges');
  }
}
