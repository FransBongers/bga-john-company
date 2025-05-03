<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_41 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_41';
    $this->title = clienttranslate('ZAMINDAR Taxes');
  }
}
