<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PowerMarkers;

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

  /**
   * A player gets power for:
   * - PowerTrack: ach enterprise (remember: some prestige cards are enterprises) or Company share is worth the amount of power 
   * indicated next to its token on the Power track. The bottom two spaces are worth 0 power. Place 1 is worth 2 power. Place 2 is worth 1 power.
   * - PrimieMinisterAndLaws: Each passed law tokens is worth +1 power, being Prime Minister grants an additional +2 power.
   * - Cards: Some blackmails cards and one Prestige card (all LondonSeasonCards) are worth power when owned by a player (family)
   * - Trophies: Each trophy is worth +1 power.
   */
  public static function calculateTotalPower()
  {
    $positionPower = [
      Locations::powerTokenPosition(1) => 2,
      Locations::powerTokenPosition(2) => 1,
      Locations::powerTokenPosition(3) => 0,
      Locations::powerTokenPosition(4) => 0,
    ];
    $trackValues = [];
    foreach (PowerMarkers::get() as $position => $type) {
      $trackValues[$type] = $positionPower[$position];
    }

    $primeMinisterPlayerId = Parliament::getPrimeMinisterPlayerId();
    $result = [];

    foreach (Players::getNonCrownPlayerIds() as $playerId) {
      $player = Players::get($playerId);
      $family = $player->getFamily();
      $cards = $player->getLondonSeasonCards();

      $powerTrack = ($trackValues[POWER_TOKEN_COMPANY_SHARE] ?? 0) * $family->getShareCount();
      foreach ($family->getEnterprises() as $enterprise) {
        $powerTrack += $trackValues[$enterprise->getType()] ?? 0;
      }
      foreach ($cards as $card) {
        $powerTrack += $trackValues[$card->getEnterpriseType()] ?? 0;
      }

      $primeMinisterAndLaws = $family->getPassedLawTokens() + ($playerId === $primeMinisterPlayerId ? 2 : 0);

      $cardsPower = 0;
      foreach ($cards as $card) {
        $cardsPower += $card->getPower() ?? 0;
      }

      $trophies = $family->getTrophies();

      $result[$playerId] = [
        'powerTrack' => $powerTrack,
        'primeMinisterAndLaws' => $primeMinisterAndLaws,
        'cards' => $cardsPower,
        'trophies' => $trophies,
        'total' => $powerTrack + $primeMinisterAndLaws + $cardsPower + $trophies,
      ];
    }

    return $result;
  }
}
