<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_11 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_11';
    $this->title = clienttranslate('Mr. Rochester');
    $this->subtype = SPOUSE;
    $this->background = 'MrRochester';
    $this->text = [clienttranslate('You may no longer enlist writers as your family action.')];
    $this->textNote = clienttranslate('Note: the extra writer from the Tenure Limits law is still permitted.');
    $this->victoryPoints = 2;
    $this->discount = 2;
  }
}
