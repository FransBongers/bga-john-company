<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_54 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_54';
    $this->title = clienttranslate('Masses Demand Franchise!');
  }
}
