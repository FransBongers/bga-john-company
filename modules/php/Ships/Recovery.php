<?php

namespace Bga\Games\JohnCompany\Ships;

class Recovery extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = RECOVERY;
    $this->name = clienttranslate('Recovery');
  }
}
