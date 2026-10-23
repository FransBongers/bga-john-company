<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

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
  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    $this->forceRerollOfLatestCheck();
  }
}
