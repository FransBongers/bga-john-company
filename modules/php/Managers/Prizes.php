<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class Prizes
{

  public static function get($prizeId)
  {
    return PRIZES[$prizeId] ?? null;
  }

  public static function getAll()
  {
    return PRIZES;
  }

  /**
   * Returns playerIds ordered by who should choose a card first:
   * most cash spent on retirements this turn, ties broken by most total
   * windows owned (prizes, enterprises, prestige cards), remaining ties
   * broken by Prime Minister order (clockwise, starting with the PM).
   */
  public static function getLondonSeasonOrder()
  {
    $data = Globals::getRetirementMoney();

    if (empty($data)) {
      return [];
    }

    $primeMinisterFamilyId = Globals::getPrimeMinister()[FAMILY];
    $primeMinisterPlayerId = $primeMinisterFamilyId !== '' ? Players::getPlayerForFamily($primeMinisterFamilyId)->getId() : null;
    $turnOrder = Players::getTurnOrder($primeMinisterPlayerId);
    $players = Players::getAll();

    $playerIds = array_keys($data);
    usort($playerIds, function ($playerIdA, $playerIdB) use ($data, $players, $turnOrder) {
      $cashSpentA = $data[$playerIdA];
      $cashSpentB = $data[$playerIdB];
      if ($cashSpentA !== $cashSpentB) {
        return $cashSpentB - $cashSpentA;
      }

      $windowsA = $players[$playerIdA]->getFamily()->getWindowCount();
      $windowsB = $players[$playerIdB]->getFamily()->getWindowCount();
      if ($windowsA !== $windowsB) {
        return $windowsB - $windowsA;
      }

      return array_search($playerIdA, $turnOrder) - array_search($playerIdB, $turnOrder);
    });

    return $playerIds;
  }

}
