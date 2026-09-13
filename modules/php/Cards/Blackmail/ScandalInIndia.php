<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class ScandalInIndia extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Scandal in India');
  }
}
