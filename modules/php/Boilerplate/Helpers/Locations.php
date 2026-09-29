<?php

namespace Bga\Games\JohnCompany\Boilerplate\Helpers;

class Locations
{
  public static function armyOfReady(string $regionId)
  {
    return 'army_' . $regionId . '_ready';
  }
  
  public static function armyOfExhausted(string $regionId)
  {
    return 'army_' . $regionId . '_exhausted';
  }

  public static function commander(string $presidencyId)
  {
    return 'Commander_' . $presidencyId;
  }

  public static function draft(string $familyId)
  {
    return 'draft_' . $familyId;
  }

  public static function familyMemberSupply(string $familyId)
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

  public static function supplyEnterprises(string $type)
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

  public static function shipsToBePlacedByCrown()
  {
    return SHIPS_TO_BE_PLACED_BY_CROWN;
  }

  public static function presidency(string $regionId)
  {
    return $regionId . 'Presidency';
  }

  public static function setupCards(string $familyId)
  {
    return 'setupCards_' . $familyId;
  }

  public static function writers(string $regionId)
  {
    return 'Writers_' . $regionId;
  }


  public static function londonSeasonPool(string $type)
  {
    return 'pool_' . $type;
  }

  public static function londonSeasonDisplay()
  {
    return LONDON_SEASON_DISPLAY;
  }

  public static function vacantOffices()
  {
    return VACANT_OFFICES;
  }

  public static function familyOffices(string $familyId)
  {
    return FAMILY_OFFICES . '_' . $familyId;
  }
}
