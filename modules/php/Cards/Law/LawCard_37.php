<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_37 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_37';
    $this->title = clienttranslate('Tenure limits');
  }
}
