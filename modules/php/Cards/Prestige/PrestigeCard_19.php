<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_19 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_19';
    $this->title = clienttranslate('Lord Highgate');
    $this->subtype = SPOUSE;
    $this->background = 'LordHighgate';
    $this->text = [clienttranslate('You may only retire to the 8 or 12 victory point prizes.')];
    $this->victoryPoints = 3;
    $this->discount = 2;
  }
}
