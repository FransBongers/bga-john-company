<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;

class Scenarios
{
  static $scenarios = [
    THE_1710_SCENARIO
  ];

  public static function get($scenarioId = null)
  {
    $scenarioId = $scenarioId === null ? Globals::getScenarioId() : $scenarioId;
    if (!\in_array($scenarioId, self::$scenarios)) {
      throw new \BgaVisibleSystemException('Trying to get a scenario not defined in Scenarios.php : ' . $scenarioId);
    }
    $name = '\Bga\Games\JohnCompany\Scenarios\\' . $scenarioId;
    return new $name();
  }
}