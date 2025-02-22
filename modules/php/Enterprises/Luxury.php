<?php

namespace Bga\Games\JohnCompany\Enterprises;

class Luxury extends \Bga\Games\JohnCompany\Models\Enterprise
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->name = clienttranslate('Luxury');
    $this->cost = 4;
    $this->victoryPoints = 2;
    $this->windows = 1;
  }
}
