<?php

namespace Bga\Games\JohnCompany\Ships;

class Walpole extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = WALPOLE;
    $this->name = clienttranslate('Walpole');
  }
}
