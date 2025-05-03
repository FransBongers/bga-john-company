<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_55 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_55';
    $this->title = clienttranslate('War Against France!');
  }
}
