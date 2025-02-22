<?php

namespace Bga\Games\JohnCompany\Ships;

class Indefatigable extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = INDEFATIGABLE;
    $this->name = clienttranslate('Indefatigable');
  }
}
