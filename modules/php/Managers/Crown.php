<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

class Crown
{

  public static function get() {
    return Globals::getCrown();
  }


  public static function drawCardAndSetClimate() {
    $aiCard = AICards::drawCard();
    $climate = $aiCard->getClimate();

    $crown = Globals::getCrown();

    $crown[CLIMATE] = $climate;

    Globals::setCrown($crown);

    Notifications::setCrownClimate(Players::get(CROWN_PLAYER_ID), $climate);
  }

  public static function getClimate()
  {
    return Globals::getCrown()[CLIMATE];
  }

}
