<?php

namespace Bga\Games\JohnCompany\Ships;

class ObraDinn extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = OBRA_DINN;
    $this->name = clienttranslate('Obra Dinn');
  }
}
