<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_17 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_17';
    $this->title = clienttranslate('William Collins');
    $this->subtype = SPOUSE;
    $this->background = 'WilliamCollins';
    $this->text = [clienttranslate('You may no longer enlist officers as your family action.')];
    $this->textNote = clienttranslate('Note: the extra officer from the Army Spending law is still permitted.');
    $this->victoryPoints = 2;
    $this->discount = 1;
  }
}
