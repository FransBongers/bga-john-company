<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_43 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_43';
    $this->title = clienttranslate('Governor General');
    $this->background = 'Law2';
    $this->policyTarget = SHIPYARD;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('The Director of Trade becomes the Governor General. All Governors become pensioners. Return the Director of Trade and Governor cards to the box. Any Company ships on regions ${tkn_italicText_unfinishedByGovernors} are returned to the supply.'),
        'args' => [
          'tkn_italicText_unfinishedByGovernors' => clienttranslate('(those unfinished by Governors)'),
        ],
      ]
    ];
  }
}
