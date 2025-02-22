<?php

namespace Bga\Games\JohnCompany\Ships;

class Britannia extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = BRITANNIA;
    $this->name = clienttranslate('Britannia');
  }
}
