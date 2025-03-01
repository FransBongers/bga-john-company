<?php

namespace Bga\Games\JohnCompany\Boilerplate\Helpers;

class Locations
{
  public static function familyMemberSupply($familyId)
  {
    return 'supply_' . $familyId;
  }

  public static function draft($familyId)
  {
    return 'draft_' . $familyId;
  }

  public static function setupCards($familyId)
  {
    return 'setupCards_' . $familyId;
  }

  public static function writers($presidencyId)
  {
    return 'Writers_' . $presidencyId;
  }

  public static function officers($presidencyId)
  {
    return 'Officers_' . $presidencyId;
  }

  public static function commander($presidencyId)
  {
    return 'Commander_' . $presidencyId;
  }

  public static function playerShipsSupply()
  {
    return SUPPLY_PLAYER_SHIPS;
  }

  public static function otherShipsSupply()
  {
    return SUPPLY_OTHER_SHIPS;
  }

  public static function enterpriseSupply($type)
  {
    return 'supply_' . $type;
  }

  public static function regimentsSupply()
  {
    return SUPPLY_REGIMENTS;
  }
}
