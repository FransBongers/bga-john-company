<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_11 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_11';
    $this->title = clienttranslate('Mr. Rochester');
    $this->type = SPOUSE;
  }
}
