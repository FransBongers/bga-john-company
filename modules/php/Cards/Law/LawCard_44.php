<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_44 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_44';
    $this->title = clienttranslate('Industry subsidy');
  }
}
