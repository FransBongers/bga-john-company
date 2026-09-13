<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class LettersOfIntroduction extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Letters of Introduction');
  }
}
