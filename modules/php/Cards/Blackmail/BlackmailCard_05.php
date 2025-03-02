<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_05 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_05';
    $this->title = clienttranslate('Scandal in India');
  }
}
