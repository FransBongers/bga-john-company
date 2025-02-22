<?php

namespace Bga\Games\JohnCompany\Ships;

class LadyFlora extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = LADY_FLORA;
    $this->name = clienttranslate('Lady Flora');
  }
}
