<?php

namespace Bga\Games\JohnCompany\Ships;

class Atlas extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ATLAS;
    $this->name = clienttranslate('Atlas');
  }
}
