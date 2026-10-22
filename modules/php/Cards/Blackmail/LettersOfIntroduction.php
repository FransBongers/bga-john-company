<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\Player;

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


  /**
   * Whether the effect of this london season card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(array $timingData): array | null
  {
    // Has to be owned by a player
    if (!Utils::startsWith($this->getLocation(), 'londonSeasonCards_')) {
      return null;
    }

    $actingPlayerId = $this->getActingPlayerId();
    if ($actingPlayerId !== $timingData[PLAYER_ID]) {
      return null;
    }

    return [
      PLAYER_ID => $this->getActingPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => BLACKMAIL_CARD,
    ];
  }

  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect($ctx, Player $player, array $timingData) {
    
  }
}
