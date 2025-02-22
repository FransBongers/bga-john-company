<?php

namespace Bga\Games\JohnCompany\Enterprises;

class Workshop extends \Bga\Games\JohnCompany\Models\Enterprise
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->name = clienttranslate('Workshop');
    $this->cost = 5;
    $this->income = 1;
    $this->votes = 2;
  }
}
