<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
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
}
