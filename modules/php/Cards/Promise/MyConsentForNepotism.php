<?php

namespace Bga\Games\JohnCompany\Cards\Promise;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;


class MyConsentForNepotism extends \Bga\Games\JohnCompany\Models\PromiseCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('My consent for nepotism');
  }

  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $this->playAndReturnToOwner();
  }
}
