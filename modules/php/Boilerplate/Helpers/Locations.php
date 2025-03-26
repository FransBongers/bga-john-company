<?php

namespace Bga\Games\JohnCompany\Boilerplate\Helpers;

class Locations
{
  public static function armyOf($regionId)
  {
    return 'Army_' . $regionId;
  }

  public static function commander($presidencyId)
  {
    return 'Commander_' . $presidencyId;
  }

  public static function draft($familyId)
  {
    return 'draft_' . $familyId;
  }

  public static function familyMemberSupply($familyId)
  {
    return 'supply_' . $familyId;
  }

  // public static function officers($presidencyId)
  // {
  //   return 'Officers_' . $presidencyId;
  // }

  public static function officerInTraining()
  {
    return OFFICER_IN_TRAINING;
  }

  public static function supplyEnterprises($type)
  {
    return 'supply_' . $type;
  }


  public static function supplyOtherShips()
  {
    return SUPPLY_OTHER_SHIPS;
  }

  public static function supplyRegiments()
  {
    return SUPPLY_REGIMENTS;
  }

  public static function supplyPlayerShips()
  {
    return SUPPLY_PLAYER_SHIPS;
  }


  public static function presidency($regionId)
  {
    return $regionId . 'Presidency';
  }

  public static function setupCards($familyId)
  {
    return 'setupCards_' . $familyId;
  }

  public static function writers($regionId)
  {
    return 'Writers_' . $regionId;
  }







  public static function londonSeasonPool($type)
  {
    return 'pool_' . $type;
  }
}
