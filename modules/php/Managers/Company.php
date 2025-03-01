<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;

class Company
{
  static $scenarios = [
    THE_1710_SCENARIO
  ];

  public static function get() {
    return Globals::getCompany();
  }

  public static function setupNewGame() {
    $scenario = Scenarios::get();

    Globals::setCompany([
      BALANCE => 5,
      STANDING => $scenario->getCompanyStanding(),
      DEBT => $scenario->getCompanyDebt(),
    ]);
  }

  public static function getVacantOffices()
  {
    return [];
  }
}
