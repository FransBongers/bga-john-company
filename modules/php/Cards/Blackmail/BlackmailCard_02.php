<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_02 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_02';
    $this->title = clienttranslate('Company Fraud');
  }
}
