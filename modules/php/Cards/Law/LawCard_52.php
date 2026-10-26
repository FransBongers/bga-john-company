<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Parliament;

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

  public function resolveImmediateEffects(object $ctx, bool $passed = true)
  {
    $player = Parliament::getPrimeMinisterPlayer();
    Globals::setOldIdeasMadeNew(true);
    LawCards::moveAllInLocation(Locations::revealedLaws(), TEMPORARY_DISCARD);
    $this->setLocation(Locations::revealedLaws());
    $this->setState(0);
    Notifications::moveLaws($player, LawCards::getInLocationOrdered(TEMPORARY_DISCARD)->toArray(), null, null);

    LawCards::moveAllInLocation(DISCARD, Locations::revealedLaws());
    Notifications::moveLaws($player, LawCards::getInLocationOrdered(Locations::revealedLaws())->toArray(), null, null);
    $ctx->insertAsBrother(new LeafNode([
      'action' => PARLIAMENT_MEETS_SELECT_LAW,
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()],
      'args' => [
        'mustSelect' => true
      ]
    ]));
  }
}
