<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;

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
}
