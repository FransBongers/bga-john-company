<?php

namespace Bga\Games\JohnCompany\Ships;

class KingGeorge extends \Bga\Games\JohnCompany\Models\Ship
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = KING_GEORGE;
    $this->name = clienttranslate('King George');
  }
}
