<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_35 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_35';
    $this->title = clienttranslate('Debt Restructure');
  }
}
