<?php

namespace Bga\Games\JohnCompany\Ships;

class Union extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = UNION;
    $this->name = clienttranslate('Union');
  }
}
