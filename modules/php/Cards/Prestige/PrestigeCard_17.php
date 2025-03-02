<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_17 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_17';
    $this->title = clienttranslate('William Collins');
    $this->type = SPOUSE;
  }
}
