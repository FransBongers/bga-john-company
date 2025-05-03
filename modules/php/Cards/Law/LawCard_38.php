<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_38 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_38';
    $this->title = clienttranslate('Sepoy Recruitment');
  }
}
