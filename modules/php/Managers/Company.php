<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class Company
{
  static $scenarios = [
    THE_1710_SCENARIO
  ];

  public static function get()
  {
    return Globals::getCompany();
  }

  public static function setupNewGame()
  {
    $scenario = Scenarios::get();

    Globals::setCompany([
      BALANCE => 5,
      STANDING => $scenario->getCompanyStanding(),
      DEBT => $scenario->getCompanyDebt(),
    ]);
  }

  private static function set($key, $value)
  {
    $company = Globals::getCompany();
    $company[$key] = $value;
    Globals::setCompany($company);
  }

  private static function inc($key, $value)
  {
    $company = Globals::getCompany();
    $company[$key] += $value;
    Globals::setCompany($company);
    return $company[$key];
  }

  public static function getVacantOffices()
  {
    return [];
  }

  public static function getBalance()
  {
    return Globals::getCompany()[BALANCE];
  }

  public static function incBalance($value)
  {
    return self::inc(BALANCE, $value);
  }

  public static function getDebt()
  {
    return Globals::getCompany()[DEBT];
  }

  public static function setBalance($value)
  {
    self::set(BALANCE, $value);
  }

  public static function setDebt($value)
  {
    self::set(DEBT, $value);
  }

  public static function getStanding()
  {
    return Globals::getCompany()[STANDING];
  }

  public static function setStanding($value)
  {
    self::set(STANDING, $value);
  }


  public static function adjustStanding($numberOfSpaces)
  {
    $currentStanding = self::getStanding();
    $index = Utils::array_find_index(COMPANY_EXPECTATIONS, function ($item) use ($currentStanding) {
      return $item === $currentStanding;
    });
    $newIndex = min(16, max(0, $index + $numberOfSpaces));
    $newStanding = COMPANY_EXPECTATIONS[$newIndex];
    self::setStanding($newStanding);
    Notifications::adjustCompanyStanding($newStanding, $numberOfSpaces);
    // TODO: company failure
  }

  public static function getOfficesWithTreasury()
  {
    // TODO: Governor General
    $officesWithTreasury = [DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING, PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS];
    return Offices::getMany($officesWithTreasury);
  }

  public static function getShares($familyId = null)
  {
    $familyMembers = FamilyMembers::getAll()->toArray();
    $shares = Utils::filter($familyMembers, function ($member) use ($familyId) {
      return in_array($member->getLocation(), [COURT_OF_DIRECTORS, CHAIRMAN]) && ($familyId === null || $member->getFamilyId() === $familyId);
    });
    return $shares;
  }

  public static function getRequiredNumberForShareMajority()
  {
    return floor(count(self::getShares()) / 2) + 1;
  }

  public static function rollDie()
  {
    return bga_rand(1, 6);
  }

  public static function makeCheck($numberOfDice)
  {
    if ($numberOfDice === 0) {
      throw new \feException("ERROR_009");
    }

    $dieResults = [];
    for ($i = 0; $i < $numberOfDice; $i++) {
      $dieResults[] = self::rollDie();
    }
    $minResult = min($dieResults);
    Notifications::log('dieResults', $dieResults);
    Notifications::log('minResult', $minResult);
    return $minResult;
  }
}
