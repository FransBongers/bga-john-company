<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class LettersOfIntroduction extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Letters of Introduction');
    $this->power = 1;
    $this->text = [
      [
        'log' => clienttranslate('Play when retiring one or more pieces ${tkn_italicText_minZero}. Act as if you also have retirement discounts equal to those on all other players\' spouses.'),
        'args' => [
          'tkn_italicText_minZero' => clienttranslate('(in London Season or Final Scoring)')
        ]
      ]
    ];
  }
}
