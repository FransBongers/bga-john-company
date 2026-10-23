<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Families;

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

  /**
   * Whether the effect of this promise card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(): array | null
  {
    throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_002");
  }

  /**
   * Apply the effect of this promise card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    throw new \Bga\GameFramework\VisibleSystemException("PROMISE_CARD_003");
  }
}
