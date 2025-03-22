<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

class JoCoUtils
{
  public static function rollDie()
  {
    return bga_rand(1, 6);
  }

  public static function makeCheck($player, $office, $numberOfDice)
  {
    if ($numberOfDice === 0) {
      throw new \feException("ERROR_010");
    }

    $dieResults = [];
    for ($i = 0; $i < $numberOfDice; $i++) {
      $dieResults[] = self::rollDie();
    }
    $minResult = min($dieResults);
    Notifications::log('minResult', $minResult);
    
    $result = null;
    if ($minResult <= 2) {
      $result = SUCCESS;
    } else if ($minResult <= 4) {
      $result = FAILURE;
    } else {
      $result = CATASTROPHIC_FAILURE;
    }
    Notifications::makeCheck($player, $dieResults, $result);
    if ($result === CATASTROPHIC_FAILURE) {
      $office->returnFamilyMemberToSupply();
    }
    return $result;
  }
}
