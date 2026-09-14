<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_38 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_38';
    $this->title = clienttranslate('Sepoy Recruitment');
    $this->background = 'Law2';
    $this->policyConsequence = BONUS;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('Regiments no longer add to Company expenses.'),
      '<br>',
      '<br>',
      clienttranslate('In attacks against the Company, each unrest is worth +1 strength.'),
    ];
  }
}
