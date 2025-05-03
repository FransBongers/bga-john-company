<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_34 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_34';
    $this->title = clienttranslate('board of control');
  }
}
