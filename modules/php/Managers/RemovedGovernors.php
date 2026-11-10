<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;

/**
 * Need to keep track of removed governors during a turn
 *  for some card effects
 */
class RemovedGovernors
{

  public static function get($key = null)
  {
    $item = Globals::getRemovedGovernors();
    if ($key === null) {
      return $item;
    } else {
      return $item[$key];
    }
  }

  public static function add(string $familyMemberId, string $governorId, string $source)
  {
    $removedGovernors = Globals::getRemovedGovernors();
    $removedGovernors[] = [
      'familyMemberId' => $familyMemberId,
      'governorId' => $governorId,
      'source' => $source, // CATASTROPHIC_FAILURE or REGION_LOSS
    ];
    Globals::setRemovedGovernors($removedGovernors);
  }

  public static function setupNewGame()
  {
    Globals::setRemovedGovernors([]);
  }

  public static function reset()
  {
    Globals::setRemovedGovernors([]);
  }

  public static function hasBeenRemoved(string $officeId, string | null $source = null): bool
  {
    $removedGovernors = Globals::getRemovedGovernors();
    foreach ($removedGovernors as $removedGovernor) {
      if ($removedGovernor['governorId'] === $officeId && ($source === null || $removedGovernor['source'] === $source)) {
        return true;
      }
    }
    return false;
  }
}
