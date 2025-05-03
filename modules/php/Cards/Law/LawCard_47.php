<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_47 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_47';
    $this->title = clienttranslate('Military Oversight');
  }
}
