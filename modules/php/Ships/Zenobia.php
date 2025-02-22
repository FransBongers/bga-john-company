<?php

namespace Bga\Games\JohnCompany\Ships;

class Zenobia extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = ZENOBIA;
    $this->name = clienttranslate('Zenobia');
  }
}
