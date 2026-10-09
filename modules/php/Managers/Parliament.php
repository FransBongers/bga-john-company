<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Models\Player;

class Parliament
{
  public static function setupNewGame()
  {
    $year = Scenarios::get()->getSetupCards();

    $position = Utils::array_find_index(PRIME_MINISTER_DIAL, function ($position) use ($year) {
      return isset($position[START_SCENARIO]) && $position[START_SCENARIO] === $year;
    });

    Globals::setParliament([
      PRIME_MINISTER => '',
      DIAL => $position,
      OPPOSITION => [], // array of $playerId => votes
      VOTES_CAST_THIS_ROUND => 0,
      SELECTING_LAW => false,
    ]);
  }

  private static function set(string $key, string | int $value)
  {
    $item = Globals::getParliament();
    $item[$key] = $value;
    Globals::setParliament($item);
  }

  public static function selectPolicy(Player $player, int $dialPosition)
  {
    self::set(DIAL, $dialPosition);
    Notifications::selectPolicy($player, $dialPosition);
  }

  public static function setSelectingLaw(bool $selectingLaw)
  {
    return self::set(SELECTING_LAW, $selectingLaw);
  }

  public static function setSupport(int $support)
  {
    self::set(SUPPORT, $support);
  }

  public static function incSupport(int $change)
  {
    self::set(SUPPORT, Globals::getParliament()[SUPPORT] + $change);
  }

  public static function incOppositionVotes(int $playerId, int $change)
  {
    $opposition = Globals::getParliament()[OPPOSITION] ?? [];
    if (!isset($opposition[$playerId])) {
      $opposition[$playerId] = 0;
    }
    $opposition[$playerId] += $change;
    self::set(OPPOSITION, $opposition);
  }

  public static function changePrimeMinister(string $familyId)
  {
    $player = Players::getPlayerForFamily($familyId);
    self::set(PRIME_MINISTER, $familyId);
    Families::get($familyId)->setIsPrimeMinister(1);
    Notifications::changePrimeMinister($player, $familyId);
  }

  public static function getPrimeMinisterPlayerId()
  {
    $familyId = Globals::getParliament()[PRIME_MINISTER];
    return Players::getPlayerForFamily($familyId)->getId();
  }

  public static function getDialPosition()
  {
    return Globals::getParliament()[DIAL];
  }

  public static function getUiData()
  {
    $data = Globals::getParliament();
    return [
      PRIME_MINISTER => [
        'family' => $data[PRIME_MINISTER] ?? null,
        'playerId' => self::getPrimeMinisterPlayerId(),
      ],
      DIAL => $data[DIAL],
      'revealedLaws' => LawCards::getInLocationOrdered(REVEALED_LAWS)->toArray(),
      'selectedLaw' => LawCards::getTopOf(SELECTED_LAW),
      SUPPORT => $data[SUPPORT] ?? 0,
      OPPOSITION => $data[OPPOSITION],
      SELECTING_LAW => $data[SELECTING_LAW] ?? false,
    ];
  }

  /**
   * Returns the dial indexes of the nearest match going left and going right (wrapping around).
   */
  public static function getPolicyOptions($policyTarget = null, $policyConsequence = null): array
  {
    $position = Globals::getParliament()[DIAL];
    $count = count(PRIME_MINISTER_DIAL);

    $matches = function (int $index) use ($policyTarget, $policyConsequence) {
      $entry = PRIME_MINISTER_DIAL[$index];
      if ($policyTarget !== null) {
        return $entry[TARGET] === $policyTarget;
      }
      return $entry[CONSEQUENCE] === $policyConsequence;
    };

    $left = null;
    $right = null;
    for ($step = 1; $step <= $count; $step++) {
      if ($left === null) {
        $index = (($position - $step) % $count + $count) % $count;
        if ($matches($index)) {
          $left = $index;
        }
      }
      if ($right === null) {
        $index = ($position + $step) % $count;
        if ($matches($index)) {
          $right = $index;
        }
      }
    }

    return [$left, $right];
  }

  public static function getRoundOfVotingNodes()
  {
    $primeMinisterPlayerId = self::getPrimeMinisterPlayerId();
    $playerOrder = Players::getTurnOrder($primeMinisterPlayerId);

    $nodes = [];

    foreach ($playerOrder as $playerId) {
      $nodes[] = [
        'action' => PARLIAMENT_MEETS_CAST_VOTES,
        'playerId' => 'some',
        'optional' => true,
        'activePlayerIds' => [$playerId],
        'args' => [
          'playerId' => $playerId,
        ]
      ];
    }
    $nodes[] = [
      'action' => PARLIAMENT_MEETS_ADDITIONAL_ROUND_OR_RESOLVE,
      'playerId' => 'some',
      'activePlayerIds' => [$primeMinisterPlayerId],
      'args' => [
        'playerId' => $primeMinisterPlayerId,
      ]
    ];

    return [
      'children' => $nodes
    ];
  }
}
