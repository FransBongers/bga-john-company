<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class MercantileConnection extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Mercantile Connection');
    $this->power = 1;
    $this->text = [
      clienttranslate('Play after a check to force a President or firm to reroll any Trade roll with half as many dice, rounding down.'),
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
