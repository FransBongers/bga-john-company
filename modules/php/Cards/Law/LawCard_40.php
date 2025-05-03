<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_40 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_40';
    $this->title = clienttranslate('Trade Regulations');
  }
}
