<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\Player;

class JoCoUtils
{
  public static function rollDie()
  {
    return bga_rand(1, 6);
  }

  public static function makeCheck(Player $player, int $numberOfDice, FamilyMember $familyMember)
  {
    if ($numberOfDice === 0) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_010");
    }

    $dieResults = [];
    for ($i = 0; $i < $numberOfDice; $i++) {
      $dieResults[] = self::rollDie();
    }
    $minResult = min($dieResults);
    
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
      $office = $familyMember->getOffice();
      $familyMember->returnToSupply();
      if ($office !== null) {
        $office->moveToVacantOffices($player);
      }
    }
    return $result;
  }

  public static function getPolicyConsequenceTranslation(string $consequence)
  {
    switch ($consequence) {
      case BONUS:
        return clienttranslate('Bonus');
      case POWER:
        return clienttranslate('Power');
      case TAX:
        return clienttranslate('Tax');
      default:
        return '';
    }
  }
}
