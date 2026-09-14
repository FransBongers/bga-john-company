<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_49 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_49';
    $this->title = clienttranslate('Company Aids Government');
    $this->background = 'Law2';
    $this->policyConsequence = POWER;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('Advance the value of Company Shares if possible ${tkn_italicText_example}'),
        'args' => [
          'tkn_italicText_example' => clienttranslate('e.g. from +1/-1 VP to +2/-2 VP.'),
        ],
      ],
      '<br>',
      '<br>',
      clienttranslate('Each Company Debt now costs £2 during Expenses.'),
    ];
  }
}
