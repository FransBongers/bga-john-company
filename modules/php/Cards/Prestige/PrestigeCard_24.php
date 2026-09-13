<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_24 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_24';
    $this->title = clienttranslate('Foundry');
    $this->subtype = ENTERPRISE;
    $this->background = 'Foundry';
    $this->enterpriseType = WORKSHOP;
    $this->text = [clienttranslate('Each time any player purchases a workshop or a regiment is added to an Army, you take £1 from the bank.')];
  }
}
