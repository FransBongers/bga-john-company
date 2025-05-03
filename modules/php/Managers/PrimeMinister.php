<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class PrimeMinister
{
  public static function setupNewGame()
  {
    $year = Scenarios::get()->getSetupCards();

    $position = Utils::array_find_index(PRIME_MINISTER_DIAL, function ($position) use ($year) {
      return isset($position[START_SCENARIO]) && $position[START_SCENARIO] === $year;
    });

    Globals::setPrimeMinister([
      FAMILY => '',
      DIAL => $position,
    ]);
  }

  private static function set($key, $value)
  {
    $item = Globals::getElephant();
    $item[$key] = $value;
    Globals::setElephant($item);
  }


  public static function changePrimeMinister($familyId) {
    $player = Players::getPlayerForFamily($familyId);
    self::set(FAMILY, $familyId);
    Families::get($familyId)->setIsPrimeMinister(1);
    Notifications::changePrimeMinister($player, $familyId);
  }
}
