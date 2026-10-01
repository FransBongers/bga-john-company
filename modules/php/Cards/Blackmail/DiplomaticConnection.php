<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class DiplomaticConnection extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Diplomatic Connection');
    $this->power = 2;
    $this->text = [
      clienttranslate('Play after a check to force a Commander to reroll any Deploy roll with half as many dice, rounding down.'),
      '<br>',
      [
        'log' => '${tkn_italicText}',
        'args' => [
          'tkn_italicText' => clienttranslate('If reduced to zero dice, treat roll as failure.')
        ]
      ]
    ];
  }
}
