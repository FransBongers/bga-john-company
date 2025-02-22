<?php

namespace Bga\Games\JohnCompany\Ships;

class Thistleworth extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = THISTLEWORTH;
    $this->name = clienttranslate('Thistleworth');
  }
}
