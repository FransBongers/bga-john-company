<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_36 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_36';
    $this->title = clienttranslate('Inclosure Acts');
    $this->background = 'Law2';
    $this->policyConsequence = BONUS;
    $this->initialSupport = -4;
    $this->text = [
      clienttranslate('Each family member on a prize now earns their family £1 during the Bonuses phase.'),
    ];
  }
}
