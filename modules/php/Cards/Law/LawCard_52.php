<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_52 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_52';
    $this->title = clienttranslate('Old Ideas Made New!');
  }
}
