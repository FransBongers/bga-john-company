<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_48 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_48';
    $this->title = clienttranslate('Writer graft reform');
  }
}
