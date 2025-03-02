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

  private static function update($key, $value)
  {
    $company = Globals::getCompany();
    $company[$key] = $value;
    Globals::setCompany($company);
  }

  public static function getVacantOffices()
  {
    return [];
  }

  public static function getDebt()
  {
    return Globals::getCompany()[DEBT];
  }

  public static function setDebt($value)
  {
    self::update(DEBT, $value);
  }

  public static function getStanding()
  {
    return Globals::getCompany()[STANDING];
  }
}
