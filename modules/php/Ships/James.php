<?php

namespace Bga\Games\JohnCompany\Ships;

class James extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = JAMES;
    $this->name = clienttranslate('James');
  }
}
