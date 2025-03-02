<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_16 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_16';
    $this->title = clienttranslate('Becky Sharp');
    $this->type = SPOUSE;
  }
}
