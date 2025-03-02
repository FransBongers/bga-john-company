<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_22 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_22';
    $this->title = clienttranslate('TAX COLLECTORS');
    $this->type = ENTERPRISE;
  }
}
