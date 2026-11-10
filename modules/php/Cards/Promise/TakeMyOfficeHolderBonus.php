<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\RemovedGovernors;
use Bga\Games\JohnCompany\Models\Player;

class TakeMyOfficeHolderBonus extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take my officeholder\'s bonus.');
  }

  /**
   * Whether the effect of this promise card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(array $timingData): array | null
  {
    if (!($this->getActingPlayerId() !== $this->getOwnerPlayerId())) {
      return null;
    }

    $bonus = Globals::getOfficeHolderBonus();
    if ($bonus === 0) {
      return null;
    }

    $officeId = $timingData['officeId'];

    if (RemovedGovernors::hasBeenRemoved($officeId, CATASTROPHIC_FAILURE)) {
      return null;
    }

    return [
      PLAYER_ID => $this->getActingPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => PROMISE_CARD,
    ];
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    $ownerPlayer = Players::get($this->getOwnerPlayerId());

    $bonus = Globals::getOfficeHolderBonus();

    $counterChanges = [
      $player->getFamilyId() => [CASH_COUNTER => $bonus],
      $ownerPlayer->getFamilyId() => [CASH_COUNTER => -$bonus],
    ];

    Notifications::updateCountersMultipleTargets($counterChanges, clienttranslate('${player_name} takes ${tkn_boldText_amount} from ${player_name2}'), [
      'player' => $player,
      'tkn_boldText_amount' => '£' . $bonus,
      'player_name2' => $ownerPlayer->getName(),
    ]);

    $this->returnToOwner();
  }
}
