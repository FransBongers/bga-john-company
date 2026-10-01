<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class HiringPreference extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Hiring Preference');
    $this->power = 1;
    $this->text = [
      clienttranslate('Play during hiring if you are a candidate. The hiring player must choose you. You may use this to ignore the Nepotism rule.')
    ];
  }
}
