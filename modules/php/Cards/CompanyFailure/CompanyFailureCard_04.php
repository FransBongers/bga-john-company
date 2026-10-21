<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

class CompanyFailureCard_04 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_04';
    $this->title = clienttranslate('Parliament Exposed!');
    $this->text = [
      clienttranslate('Lower each player\'s score by 1VP for each of their passed law tokens. Then, the Prime Minister lowers their score by 2VP.'),
      [
        'log' => '${tkn_italicText}',
        'args' => ['tkn_italicText' => clienttranslate('The cartoon on this card captures the public\'s skepticism towards Prime Minister Disraeli\'s imperial ambitions. The depiction of Disraeli as the villain Abanazar from an adaptation of Aladdin also underlines his Jewish ancestry in ways that demonstrate how racism permeated even anti-imperialist positions.')]
      ]
    ];
  }
}
