<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_06 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_06';
    $this->title = clienttranslate('Hiring Preference');
  }
}
