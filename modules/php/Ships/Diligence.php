<?php

namespace Bga\Games\JohnCompany\Ships;

class Diligence extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = DILIGENCE;
    $this->name = clienttranslate('Diligence');
  }
}
