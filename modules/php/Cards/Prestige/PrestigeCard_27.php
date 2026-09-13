<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_27 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_27';
    $this->title = clienttranslate('Scottish Castle');
    $this->subtype = ENTERPRISE;
    $this->background = 'ScottishCastle';
    $this->enterpriseType = LUXURY;
    $this->power = 3;
  }
}
