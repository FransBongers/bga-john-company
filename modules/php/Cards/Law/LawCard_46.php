<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_46 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_46';
    $this->title = clienttranslate('Window tax repeal');
  }
}
