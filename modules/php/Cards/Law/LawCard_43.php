<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_43 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_43';
    $this->title = clienttranslate('Governor General');
  }
}
