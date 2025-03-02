<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_15 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_15';
    $this->title = clienttranslate('Joseph Sedley');
    $this->type = SPOUSE;
  }
}
