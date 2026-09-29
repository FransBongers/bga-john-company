<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class LocalAlliance extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->type = LOCAL_ALLIANCE;
  }

  public function purchaseAlliance(Player $player, string $presidentOfficeId)
  {
    $office = Offices::get($presidentOfficeId);
    $office->pay($player, $this->getCost());
    $this->setLocation(Locations::armyOfReady($this->getPresidencyId()));
    Notifications::purchaseLocalAlliance($player, $this);
  }
}
