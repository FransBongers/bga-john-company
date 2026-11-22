<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Models\Player;

class TakeMyLondonSeasonCard extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  protected $timingWindows = [START_OF_LONDON_SEASON_CHOOSE_CARD];

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take my card from the London Season Display');
  }

  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    if ($this->getOwnerPlayerId() != $itemId) {
      return null;
    }
    return parent::effectCanBeApplied($timingWindow, $itemId);
  }

  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $this->playAndReturnToOwner();
    $nodes = $ctx->getParent()->getUnresolvedActions([LONDON_SEASON_CHOOSE_CARD]);
    if (count($nodes) !== 1) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_087");
    }
    $nodes[0]->updateInfo('activePlayerIds', [$player->getId()]);
    Engine::save();
  }
}
