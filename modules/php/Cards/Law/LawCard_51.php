<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_51 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_51';
    $this->title = clienttranslate('Public Demands Impeachment!');
  }
}
