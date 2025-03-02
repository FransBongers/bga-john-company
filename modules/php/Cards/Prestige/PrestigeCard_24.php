<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_24 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_24';
    $this->title = clienttranslate('FOUNDRY');
    $this->type = ENTERPRISE;
  }
}
