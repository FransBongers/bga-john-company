<?php

namespace Bga\Games\JohnCompany\Ships;

class ConstantFriend extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = CONSTANT_FRIEND;
    $this->name = clienttranslate('Constant Friend');
  }
}
