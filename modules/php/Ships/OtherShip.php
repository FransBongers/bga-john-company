<?php

namespace Bga\Games\JohnCompany\Ships;

class OtherShip extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = $row['ship_id'];
    $this->name = clienttranslate('Other Ship');
  }

  public function getName(): string
  {
    return $this->getSide() === COMPANY_SHIP ? clienttranslate('Company Ship') : clienttranslate('Extra Ship');
  }
}
