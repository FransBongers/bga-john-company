<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\FamilyMembers;

class TaxAndUpkeepBase extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected function getTax(array $players, string $target)
  {
    $result = [];
    foreach ($players as $player) {
      $amount = 0;
      $playerTargets = [];

      if ($target === SHARE) {
        $shares = Company::getShares($player->getId());
        foreach ($shares as $share) {
          $playerTargets[$share->getId()] = 1;
        }
        $amount = count($shares);
      } else {
        $amount = 0;
        foreach ($player->getEnterprises() as $enterprise) {
          if ($enterprise->getType() === $target) {
            $amount++;
            $playerTargets[$enterprise->getId()] = 1;
          }
        }
        foreach ($player->getLondonSeasonCards() as $card) {
          if ($card->getEnterpriseType() === $target) {
            $amount++;
            $playerTargets[$card->getId()] = 1;
          }
        }
      }

      $result[] = [
        'player' => $player,
        'amount' => $amount,
        'targets' => $playerTargets,
      ];
    }
    return $result;
  }

  protected function getUpkeep(array $players)
  {
    $result = [];
    foreach ($players as $player) {
      $playerResult = [
        'player' => $player,
        'amount' => 0,
        'targets' => [],
      ];

      foreach (FamilyMembers::getAllFor($player->getId()) as $familyMember) {
        $location = $familyMember->getLocation();
        if (array_key_exists($location, PRIZES)) {
          $prizeUpkeep = PRIZES[$location][UPKEEP];
          if ($prizeUpkeep > 0) {
            $playerResult['amount'] += $prizeUpkeep;
            $playerResult['targets'][$familyMember->getId()] = $prizeUpkeep;
          }
        }
      }

      $result[] = $playerResult;
    }
    return $result;
  }

  protected function getWindowCount(array $players)
  {
    $result = [];
    foreach ($players as $player) {
      list($windows, $targets) = $player->getWindowCount();
      $result[] = [
        'player' => $player,
        'amount' => $windows,
        'targets' => $targets,
      ];
    }
    return $result;
  }
}
