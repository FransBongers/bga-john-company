<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_50 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_50';
    $this->title = clienttranslate('Royal Protection');
    $this->background = 'Law2';
    $this->policyTarget = LUXURY;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('If the Company would take any emergency loans the Chairman may discard this card to avoid those loans and cancel any remaining expenses.'),
      '<br>',
      '<br>',
      [
        'log' => '${tkn_italicText}',
        'args' => [
          'tkn_italicText' => clienttranslate('Note: this means that Standing will not be reduced from emergency loans, but will still be reduced from the Company not meeting expectations.'),
        ],
      ],
    ];
  }
}
