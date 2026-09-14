<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_48 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_48';
    $this->title = clienttranslate('Writer Graft Reform');
    $this->background = 'Law2';
    $this->policyConsequence = POWER;
    $this->initialSupport = 0;
    $this->text = [
      [
        'log' => clienttranslate('Writer bonuses are paid to the Company Balance track instead. ${tkn_italicText_note}'),
        'args' => [
          'tkn_italicText_note' => clienttranslate('Note: writers still make money from the Windfall event.'),
        ],
      ],
      '<br>',
      '<br>',
      clienttranslate('If the Writer Privileges law is in effect, discard it.'),
    ];
  }
}
