<?php

namespace Bga\Games\JohnCompany\Ships;

class Eliza extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ELIZA;
    $this->name = clienttranslate('Eliza');
  }
}
