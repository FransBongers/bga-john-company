<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_44 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_44';
    $this->title = clienttranslate('Industry subsidy');
    $this->background = 'Law2';
    $this->policyConsequence = TAX;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('If your opportunity token is not on the workshop space and you take the purchase workshop action, pay only £3 (not £5).'),
      '<br>',
      [
        'log' => '${tkn_italicText}',
        'args' => [
          'tkn_italicText' => clienttranslate('Note: this does not apply to a workshop purchased with Calico Acts. Furthermore, a player (or the Crown) without an opportunity token will always benefit from this law.'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('Discard this law if deregulation occurs. ${tkn_italicText_note}'),
        'args' => [
          'tkn_italicText_note' => clienttranslate('Note: If deregulation has already occurred, this law may still be passed.'),
        ],
      ]
    ];
  }
}
