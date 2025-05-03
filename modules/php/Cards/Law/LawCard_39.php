<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_39 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_39';
    $this->title = clienttranslate('Ship Subsidy');
  }
}
