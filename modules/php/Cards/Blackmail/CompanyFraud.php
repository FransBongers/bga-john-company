<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Offices;

use Bga\Games\JohnCompany\Models\Player;

class CompanyFraud extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Company Fraud');
    $this->text = [
      [
        'log' => clienttranslate('Play at the start of the Revenue phase. Roll one die for each of your officeholders. Lower the Company Balance equal to twice the highest roll ${tkn_italicText_minZero} and take that much from the bank.'),
        'args' => [
          'tkn_italicText_minZero' => clienttranslate('(to a minimum of zero)')
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

    $offices = Offices::getAll()->toArray();

    $playerId = $this->getActingPlayerId();

    $officeHolders = Utils::filter($offices, fn($office) => $office->getPlayerId() === $playerId);

    if (count($officeHolders) === 0) {
      return null;
    }

    return [
      PLAYER_ID => $playerId,
      CARD_ID => $this->getId(),
      CARD_TYPE => BLACKMAIL_CARD,
    ];
  }

    /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect($ctx, Player $player, array $timingData)
  {
    Notifications::message(clienttranslate('${player_name} applies the effect of ${tkn_blackmailCard}'), [
      'player_name' => $player->getName(),
      'tkn_blackmailCard' => $this->getId()
    ]);
  }
}
