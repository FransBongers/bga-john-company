<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class ThePrimeMinistersEar extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate("The Prime Minister's Ear");
  }
}
