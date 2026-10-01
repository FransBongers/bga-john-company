<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class ThePrimeMinistersEar extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate("The Prime Minister's Ear");
    $this->power = 2;
    $this->text = [
      clienttranslate('Play anytime on a turn before the Family phase to swap two adjacent power markers.')
    ];
  }
}
