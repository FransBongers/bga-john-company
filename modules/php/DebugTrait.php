<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;


trait DebugTrait
{

  function debug_test()
  {
    $players = Families::getAll()->toArray();

    Notifications::log('players', $players);

    // Families::setupNewGame($players);
    // SetupCards::setupNewGame($players);

    // Notifications::log('setup', SetupCards::getInLocationOrdered(DECK)->toArray());
  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }


}
