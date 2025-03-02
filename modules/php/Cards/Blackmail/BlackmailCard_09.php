<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_09 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_09';
    $this->title = clienttranslate('Diplomatic Connection');
  }
}
