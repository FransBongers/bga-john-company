<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\Player;

class ManOnTheInside extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Man on the Inside');
    $this->power = 1;
    $this->text = [
      clienttranslate('Play this card to cancel the effect of a blackmail card when played. The canceled card should be taken into your play area face up.'),
      [
        'log' => '${tkn_italicText}',
        'args' => [
          'tkn_italicText' => clienttranslate('You cannot play this card to cancel Letters of Introduction during Final Scoring.')
        ]
      ]
    ];
  }

  // Input player is the player playing a blackmail card
  public function canBePlayed(Player $player): bool
  {
    // Has to be owned by a player
    if (!Utils::startsWith($this->getLocation(), 'londonSeasonCards_')) {
      return false;
    }
    // Player should not be asked to cancel their own card
    return $this->getActingPlayerId() !== $player->getId();
  }
}
