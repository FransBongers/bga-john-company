<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\Players;

class PromiseCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'promise_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;
  protected $type;
  protected $familyId;
  protected $ownerPlayerId;

  protected $title;
  protected $timingWindows = [];

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => ['card_location', 'str'],
    'state' => ['card_state', 'int'],
    'type' => ['type', 'str'],
    'ownerPlayerId' => ['owner_player_id', 'int'],
    'familyId' => ['family_id', 'str']
  ];

  protected $staticAttributes = [
    'title',
    'timingWindows'
  ];

  public function removeFromGame(Player $player)
  {
    $this->setLocation(REMOVED_FROM_GAME);
    Notifications::removeCardFromGame($player, $this);
  }

  public function getStaticData(): array
  {
    $data = parent::getStaticData();
    $data['familyId'] = $this->getFamilyId();
    return $data;
  }

  public function getTimingWindows(): array
  {
    return $this->timingWindows;
  }

  public function canBePlayedAnytime(array $timingData): bool
  {
    return false;
  }

  /**
   * Acting player for any effect of this promise card
   */
  public function getActingPlayerId(): int
  {
    $location = $this->getLocation();
    if ($location === DISCARD) {
      throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_001");
    }

    return (int) $location;
  }

  public function getOwnerPlayerId(): int
  {
    return $this->ownerPlayerId;
  }

  /**
   * Whether the effect of this promise card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(string | int | null $itemId): array | null
  {
    if ($this->getActingPlayerId() === $this->getOwnerPlayerId()) {
      return null;
    }
    return [
      PLAYER_ID => $this->getActingPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => PROMISE_CARD,
    ];
  }

  /**
   * Apply the effect of this promise card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_003");
  }

  public function playAndReturnToOwner()
  {
    $actingPlayerId = $this->getActingPlayerId();
    $ownerPlayerId = $this->getOwnerPlayerId();
    if ($actingPlayerId === $ownerPlayerId) {
      throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_004");
    }
    $players = Players::getAll();

    $this->setLocation(Locations::promiseCards($ownerPlayerId));
    Notifications::movePromiseCard($players[$actingPlayerId], $this, clienttranslate('${player_name} plays ${tkn_promiseCard}'), [
      'player' => $players[$actingPlayerId],
    ]);
  }
}
