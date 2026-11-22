<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;

class BlackmailCard extends \Bga\Games\JohnCompany\Models\LondonSeasonCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->type = BLACKMAIL;
    $this->background = 'Blackmail';
  }

  public function jsonSerializePrivate(): array
  {
    $hiddenId = $this->getId();
    $data = parent::jsonSerialize();
    $data['hiddenId'] = $hiddenId;
    return $data;
  }

  public function play(object $ctx, Player $player): void
  {
    $this->setLocation(Locations::playedBlackmailCards($player->getId()));
    Notifications::moveBlackmailCard($player, $this, clienttranslate('${player_name} plays ${tkn_blackmailCard}'), [
      'player' => $player,
      'tkn_blackmailCard' => $this->getId(),
    ]);

    if ($this->getId() === MAN_ON_THE_INSIDE_ID) {
      return;
    }

    $manOnTheInsideCard = LondonSeasonCards::get(MAN_ON_THE_INSIDE_ID);
    if ($manOnTheInsideCard->canBePlayed($player)) {
      // Insert before because it is needed for anytime actions
      // Should not matter for other actions
      $ctx->insertBefore(new LeafNode([
        'action' => USE_MAN_ON_THE_INSIDE,
        'playerId' => 'some',
        'activePlayerIds' => [$manOnTheInsideCard->getActingPlayerId()],
        'args' => [
          'cardId' => $this->getId(),
          'actingPlayerId' => $player->getId()
        ],
      ]));
    } else {
      // Card cannot be cancelled, so apply its effect immediately
      $this->applyEffect($ctx, $player, null);
    }
  }



  public function canBePlayedAnytime(array $anytimeData): bool
  {
    return false;
  }

  /**
   * Whether the effect of this blackmail card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
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
   * Apply the effect of this black card
   * Only for effects with specific timing windows
   */
  public function forceRerollOfLatestCheck()
  {
    $latestCheck = Globals::getLatestCheck();

    $playerMakingCheckId = $latestCheck['playerId'];
    $familyMemberId = $latestCheck['familyMemberId'];
    $numberOfDice = $latestCheck['numberOfDice'];
    $result = $latestCheck['result'];

    $playerMakingCheck = Players::get($playerMakingCheckId);

    $numberOfDice = (int) floor($numberOfDice / 2);

    if ($numberOfDice === 0) {
      $result = FAILURE;
      Notifications::message(clienttranslate('${player_name} is reduced to zero dice: the check is a ${tkn_boldText_checkResult}'), [
        'player' => $playerMakingCheck,
        'tkn_boldText_checkResult' => Notifications::getCheckResultTranslation($result)
      ]);
      Globals::setLatestCheck([
        'playerId' => $playerMakingCheckId,
        'familyMemberId' => $familyMemberId,
        'numberOfDice' => $numberOfDice,
        'result' => $result,
      ]);
    } else {
      JoCoUtils::makeCheck($playerMakingCheck, $numberOfDice, FamilyMembers::get($familyMemberId), false);
    }
  }
}
