<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_54 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_54';
    $this->title = clienttranslate('Masses Demand Franchise!');
    $this->background = 'Dilemma2';
    $this->header = 'dilemma';
    $this->policyTarget = LUXURY;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('${tkn_boldText_ifPassed} Rotten Boroughs are now only worth one vote each. Votes now cost £2 instead of £1.'),
        'args' => [
          'tkn_boldText_ifPassed' => clienttranslate('If passed:'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifFailed} Nothing happens.'),
        'args' => [
          'tkn_boldText_ifFailed' => clienttranslate('If failed:'),
        ],
      ],
    ];
  }
}
