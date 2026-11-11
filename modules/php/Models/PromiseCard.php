<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Families;
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

  protected $title;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => ['card_location', 'str'],
    'state' => ['card_state', 'int'],
    'type' => ['type', 'str'],
    'familyId' => ['family_id', 'str']
  ];

  protected $staticAttributes = [
    'title'
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

  /**
   * Acting player for any effect of this promise card
   */
  public function getActingPlayerId(): int
  {
    $location = $this->getLocation();
    if ($location === DISCARD) {
      throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_001");
    }

    return Families::getPlayerIdByFamilyId(explode('_', $location)[1]);
  }

  public function getOwnerPlayerId(): int
  {
    return (int) explode('_', $this->getId())[1];
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
  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_003");
  }

  public function returnToOwner()
  {
    $actingPlayerId = $this->getActingPlayerId();
    $ownerPlayerId = $this->getOwnerPlayerId();
    if ($actingPlayerId === $ownerPlayerId) {
      throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_004");
    }
    $players = Players::getAll();

    $this->setLocation(Locations::promiseCards($players[$ownerPlayerId]->getFamilyId()));
    Notifications::movePromiseCard($players[$actingPlayerId], $this, clienttranslate('${player_name} returns ${tkn_promiseCard} to ${player_name2}'), [
      'player' => $players[$actingPlayerId],
      'player_name2' => $players[$ownerPlayerId]->getName()
    ]);
  }
}
