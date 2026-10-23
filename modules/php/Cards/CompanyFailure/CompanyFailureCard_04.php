<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;

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

  public function resolveEffect()
  {
    $primeMinisterPlayerId = Parliament::getPrimeMinisterPlayerId();
    foreach (Players::getTurnOrder($primeMinisterPlayerId) as $playerId) {
      $player = Players::get($playerId);
      $count = $player->getFamily()->getPassedLawTokens();
      if ($count === 0) {
        continue;
      }

      Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) for their ${tkn_boldText_tokens}'), [
        'player' => $player,
        'tkn_boldText_value' => $count,
        'tkn_boldText_tokens' => clienttranslate('Passed Law Tokens'),
        'i18n' => ['tkn_boldText_tokens']
      ]);
      $player->incScore(-$count);
    }

    $primeMinister = Players::get($primeMinisterPlayerId);
    Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) as Prime Minister'), [
      'player' => $primeMinister,
      'tkn_boldText_value' => 2,
    ]);
    $primeMinister->incScore(-2);
  }
}
