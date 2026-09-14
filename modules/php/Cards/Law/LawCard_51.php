<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_51 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_51';
    $this->title = clienttranslate('Public Demands Impeachment!');
    $this->background = 'Dilemma2';
    $this->header = 'dilemma';
    $this->policyTarget = SHARE;
    $this->initialSupport = 1;
    $this->text = [
      clienttranslate('First, the Prime Minister picks one officeholder.'),
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifPassed} Return officeholder to supply, and add office card to the Vacant Offices box.'),
        'args' => [
          'tkn_boldText_ifPassed' => clienttranslate('If passed:'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifFailed} Company Standing falls one space. This may cause Company failure.'),
        'args' => [
          'tkn_boldText_ifFailed' => clienttranslate('If failed:'),
        ],
      ],
    ];
  }
}
