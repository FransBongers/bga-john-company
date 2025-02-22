<?php

namespace Bga\Games\JohnCompany\Ships;

class York extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = YORK;
    $this->name = clienttranslate('York');
  }
}
