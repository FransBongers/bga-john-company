<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_50 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_50';
    $this->title = clienttranslate('Royal Protection');
  }
}
