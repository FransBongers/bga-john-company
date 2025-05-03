<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_56 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_56';
    $this->title = clienttranslate('Deregulation');
  }
}
