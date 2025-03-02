<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_04 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_04';
    $this->title = clienttranslate('Scandal on Leadenhall Street');
  }
}
