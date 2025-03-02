<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_30 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_30';
    $this->title = clienttranslate('ROTTEN BOROUGH');
    $this->type = ENTERPRISE;
  }
}
