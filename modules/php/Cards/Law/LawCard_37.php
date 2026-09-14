<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_37 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_37';
    $this->title = clienttranslate('Tenure Limits');
    $this->background = 'Law1';
    $this->policyConsequence = POWER;
    $this->initialSupport = 0;
    $this->text = [
      clienttranslate('The Chairman will always retire during the first step of the London Season.'),
    ];
    $this->extraAction = ENLIST_WRITER;
    $this->extraActionText = [
      [
        'log' => clienttranslate('After taking any family action(s) ${tkn_boldText_otherThanEnlistWriter}, you may gain a single writer.'),
        'args' => [
          'tkn_boldText_otherThanEnlistWriter' => clienttranslate('other than enlist writer'),
        ],
      ]
    ];
  }
}
