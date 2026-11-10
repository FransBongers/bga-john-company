<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Models\Player;

class TakeMyLondonSeasonCard extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Take my card from the London Season Display.');
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    $nodes = $ctx->getParent()->getUnresolvedActions([LONDON_SEASON_CHOOSE_CARD]);
    if (count($nodes) !== 0) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_087");
    }
    $nodes[0]->updateInfo('activePlayerIds', [$player->getId()]);
    Engine::save();

    $this->returnToOwner();
  }
}
