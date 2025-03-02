<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_29 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_29';
    $this->title = clienttranslate('ROTTEN BOROUGH');
    $this->type = ENTERPRISE;
  }
}
