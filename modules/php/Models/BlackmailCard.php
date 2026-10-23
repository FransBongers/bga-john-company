<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
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

  public function play(Player $player)
  {
    $familyId = $player->getFamilyId();
    $this->setLocation(Locations::playedBlackmailCards($familyId));
    Notifications::moveBlackmailCard($player, $this, clienttranslate('${player_name} plays ${tkn_blackmailCard}'), [
      'player' => $player,
      'tkn_blackmailCard' => $this->getId(),
    ]);
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
