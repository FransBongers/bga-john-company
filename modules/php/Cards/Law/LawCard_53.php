<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_53 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_53';
    $this->title = clienttranslate('Relief Demanded for Indian Famine!');
    $this->background = 'Dilemma2';
    $this->header = 'dilemma';
    $this->policyConsequence = TAX;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('${tkn_boldText_ifPassed} Enact this policy consequence a second time.'),
        'args' => [
          'tkn_boldText_ifPassed' => clienttranslate('If passed:'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifFailed} The Turmoil event occurs in each home region. Add 1 unrest to every Company-controlled region.'),
        'args' => [
          'tkn_boldText_ifFailed' => clienttranslate('If failed:'),
        ],
      ],
    ];
  }
}
