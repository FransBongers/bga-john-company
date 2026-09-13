<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_14 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_14';
    $this->title = clienttranslate('Violet Effingham');
    $this->subtype = SPOUSE;
    $this->background = 'VioletEffingham';
    $this->text = [clienttranslate('You may no longer purchase or own shipyards. Any you currently have must be traded or discarded.')];
    $this->textNote = clienttranslate('(Fitted ships associated with discarded shipyards remain in play.)');
    $this->victoryPoints = 2;
    $this->discount = 1;
  }
}
