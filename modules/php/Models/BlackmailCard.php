<?php

namespace Bga\Games\JohnCompany\Models;

class BlackmailCard extends \Bga\Games\JohnCompany\Models\LondonSeasonCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->type = BLACKMAIL;
  }
}
