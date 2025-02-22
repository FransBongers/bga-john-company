<?php

namespace Bga\Games\JohnCompany\Enterprises;

use Bga\Games\JohnCompany\Managers\Ships;

class Shipyard extends \Bga\Games\JohnCompany\Models\Enterprise
{
  protected $shipId;

  public function __construct($row)
  {
    parent::__construct($row);
    $this->name = clienttranslate('Shipyard');
    $this->cost = 2;
    $this->votes = 1;
  }

  public function getIncome() {
    return Ships::get($this->shipId)->getLocation() === $this->id ? 0 : 1;
  }
}
