<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_52 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_52';
    $this->title = clienttranslate('Old Ideas Made New!');
    $this->background = 'Dilemma1';
    $this->header = 'dilemma';
    $this->text = [
      [
        'log' => clienttranslate('Immediately search the discard pile and select one law (you may select a dilemma). ${tkn_italicText_note} After resolving the vote, shuffle all discards, cards drawn this turn, and this law into the deck.'),
        'args' => [
          'tkn_italicText_note' => clienttranslate('Note: cards drawn this turn are not yet in the discard pile.'),
        ],
      ],
      '<br>',
      '<br>',
      clienttranslate('If there are no cards in the discard pile, ignore this card, shuffle it back into the deck,and draw a new law.'),
    ];
  }
}
