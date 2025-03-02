<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_07 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_07';
    $this->title = clienttranslate('Envoy to the Mughals');
  }
}
