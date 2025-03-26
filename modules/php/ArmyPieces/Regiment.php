<?php

namespace Bga\Games\JohnCompany\ArmyPieces;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

class Regiment extends \Bga\Games\JohnCompany\Models\ArmyPiece
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->name = clienttranslate('Regiment');
    $this->type = REGIMENT;
  }

  public function moveTo($player, $newLocation)
  {
    $from = $this->getLocation();
    $this->setLocation($newLocation);
    Notifications::moveRegiment($player, $this, $from);
  }
}
