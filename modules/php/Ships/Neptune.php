<?php

namespace Bga\Games\JohnCompany\Ships;

class Neptune extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = NEPTUNE;
    $this->name = clienttranslate('Neptune');
  }
}
