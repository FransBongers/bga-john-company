<?php

namespace Bga\Games\JohnCompany\Ships;

class Samaritan extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SAMARITAN;
    $this->name = clienttranslate('Samaritan');
  }
}
