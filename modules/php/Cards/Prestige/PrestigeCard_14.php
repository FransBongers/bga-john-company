<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_14 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_14';
    $this->title = clienttranslate('Violet Effingham');
    $this->type = SPOUSE;
  }
}
