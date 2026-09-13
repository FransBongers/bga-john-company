<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_16 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_16';
    $this->title = clienttranslate('Becky Sharp');
    $this->subtype = SPOUSE;
    $this->background = 'BeckySharp';
    $this->text = [clienttranslate('When taking prestige cards, you may take a card from the top of the deck instead as long as there is at least one card in the display.')];
    $this->power = 2;
  }
}
