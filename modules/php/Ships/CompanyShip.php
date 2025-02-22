<?php

namespace Bga\Games\JohnCompany\Ships;

class CompanyShip extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = $row['ship_id'];
    $this->name = clienttranslate('Company Ship');
  }
}
