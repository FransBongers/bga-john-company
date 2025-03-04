<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class Crown
{

  public static function get()
  {
    return Globals::getCrown();
  }


  public static function drawCardAndSetClimate()
  {
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

  private static function getPriorityForPresidency($frontCard, $backCard, $presidencyId)
  {
    $orderIndex = Utils::array_find_index($backCard->getPresidencyOrder(), function ($item) use ($presidencyId) {
      return $item === $presidencyId;
    });
    return $frontCard->getPresidencyPriority()[$orderIndex];
  }

  public static function getPresidencyWithHighestPriority($presidencies)
  {
    $frontCard = AICards::getTopOf(DISCARD);
    $backCard = AICards::getTopOf(DECK);

    usort($presidencies, function ($a, $b) use ($frontCard, $backCard) {
      return self::getPriorityForPresidency($frontCard, $backCard, $a->getPresidencyId()) - self::getPriorityForPresidency($frontCard, $backCard, $b->getPresidencyId());
    });

    return $presidencies[0];
  }
}
