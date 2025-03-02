<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class BlackmailCard_08 extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'BlackmailCard_08';
    $this->title = clienttranslate('Mercantile Connection');
  }
}
