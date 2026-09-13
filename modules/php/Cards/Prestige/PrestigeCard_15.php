<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_15 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_15';
    $this->title = clienttranslate('Joseph Sedley');
    $this->subtype = SPOUSE;
    $this->background = 'JosephSedley';
    $this->text = [clienttranslate('You may no longer seek or own Company shares. If you are Chairman, move your family member back into the Court as a share and vacate the office. Any shares you have must be traded or removed.')];
    $this->victoryPoints = 2;
    $this->discount = 1;
  }
}
