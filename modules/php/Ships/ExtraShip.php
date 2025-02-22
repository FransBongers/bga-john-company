<?php

namespace Bga\Games\JohnCompany\Ships;

class ExtraShip extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = $row['ship_id'];
    $this->name = clienttranslate('Extra Ship');
  }
}
