<?php

namespace Bga\Games\JohnCompany\Ships;

class Hampshire extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = HAMPSHIRE;
    $this->name = clienttranslate('Hampshire');
  }
}
