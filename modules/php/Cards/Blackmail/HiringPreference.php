<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class HiringPreference extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Hiring Preference');
  }
}
