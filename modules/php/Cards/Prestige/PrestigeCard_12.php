<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_12 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_12';
    $this->title = clienttranslate('Esther Summerson');
    $this->subtype = SPOUSE;
    $this->background = 'EstherSummerson';
    $this->text = [clienttranslate('You may no longer take or own blackmail cards. Any you currently have facedown must be traded or discarded. Faceup blackmail cards must be discarded.')];
    $this->victoryPoints = 2;
    $this->discount = 1;
  }
}
