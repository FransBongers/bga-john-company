<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_36 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_36';
    $this->title = clienttranslate('Inclosure ACTS');
  }
}
