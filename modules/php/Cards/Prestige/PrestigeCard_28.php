<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_28 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_28';
    $this->title = clienttranslate('ROTTEN BOROUGH');
    $this->type = ENTERPRISE;
  }
}
