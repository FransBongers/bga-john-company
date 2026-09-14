<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_55 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_55';
    $this->title = clienttranslate('War Against France!');
    $this->background = 'Dilemma2';
    $this->header = 'dilemma';
    $this->policyConsequence = TAX;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('${tkn_boldText_ifPassed} The Prime Minister selects 3 non-extra ships and 3 officers/regiments. Return ships to shipyards or their supply. Officers/regiments are returned to their supplies.'),
        'args' => [
          'tkn_boldText_ifPassed' => clienttranslate('If passed:'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifFailed} Roll the storm die and resolve a Foreign Invasion event in the home region(s) associated with any sea zone shown ${tkn_italicText_ifNone}.'),
        'args' => [
          'tkn_boldText_ifFailed' => clienttranslate('If failed:'),
          'tkn_italicText_ifNone' => clienttranslate('(if none, no invasion occurs)'),
        ],
      ],
    ];
  }
}
