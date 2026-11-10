<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\Player;

class VoteWithMyEnterprises extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Vote with my enterprises as if you owned them.');
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    Parliament::updateVoteWithMyEnterprises($player->getId(), $this->getOwnerPlayerId());

    $this->returnToOwner();
  }
}
