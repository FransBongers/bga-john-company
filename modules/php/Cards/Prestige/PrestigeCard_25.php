<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_25 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_25';
    $this->title = clienttranslate('STOCK BROKER');
    $this->type = ENTERPRISE;
  }
}
