<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_03 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_03';
    $this->title = clienttranslate('Letters of Introduction');
  }
}
