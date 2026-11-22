<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Models\Player;

class TakeTwoOrLessFromMe extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take £2 or less from me');
  }

  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    if (Players::get($this->getOwnerPlayerId())->getTreasury() <= 0) {
      return null;
    }
    return parent::effectCanBeApplied($timingWindow, $itemId);
  }

  public function canBePlayedAnytime(array $anytimeData): bool
  {
    return true;
  }

  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $this->playAndReturnToOwner();

    $ownerPlayer = Players::get($this->getOwnerPlayerId());
    $amount = min(2, $ownerPlayer->getTreasury());
    $ownerPlayer->incTreasury(-$amount);
    $player->incTreasury($amount);

    $counterChanges = [
      $player->getId() => [CASH_COUNTER => $amount],
      $ownerPlayer->getId() => [CASH_COUNTER => -$amount],
    ];

    Notifications::updateCountersMultipleTargets($counterChanges, clienttranslate('${player_name} takes ${tkn_boldText_amount} from ${player_name2}'), [
      'player' => $player,
      'tkn_boldText_amount' => '£' . $amount,
      'player_name2' => $ownerPlayer->getName(),
    ]);
  }
}
