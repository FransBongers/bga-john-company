<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_01 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_01';
    $this->title = clienttranslate("The Prime Minister's Ear");
  }
}
