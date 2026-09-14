<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_46 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_46';
    $this->title = clienttranslate('Window Tax Repeal');
    $this->background = 'Law1';
    $this->policyTarget = LUXURY;
    $this->initialSupport = -5;
    $this->text = [
      clienttranslate('Players no longer pay window taxes.'),
      '<br>',
      '<br>',
      clienttranslate('However, a player with the Tax Collector enterprise may still add a single window tax exempt from this law as per the rules on that card.'),
    ];
    $this->extraAction = PURCHASE_LUXURY;
    $this->extraActionText = [
      clienttranslate('After taking any family action(s), you may buy a luxury.'),
    ];
  }
}
