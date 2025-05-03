<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_53 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_53';
    $this->title = clienttranslate('Relief Demanded for Indian Famine!');
  }
}
