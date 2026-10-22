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

  private static function set(string $key, string | int | array $value)
  {
    $item = Globals::getRemovedGovernors();
    $item[$key] = $value;
    Globals::setRemovedGovernors($item);
  }

  public static function setupNewGame()
  {
    Globals::setRemovedGovernors([]);
  }

  public static function reset()
  {
    Globals::setRemovedGovernors([]);
  }
}
