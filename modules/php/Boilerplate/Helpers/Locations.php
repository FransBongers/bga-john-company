<?php

namespace Bga\Games\JohnCompany\Boilerplate\Helpers;

class Locations
{
  public static function controlToken(string $regionId)
  {
    return $regionId;
  }

  public static function armyOfReady(string $presidencyId)
  {
    return 'army_' . $presidencyId . '_ready';
  }

  public static function armyOfExhausted(string $presidencyId)
  {
    return 'army_' . $presidencyId . '_exhausted';
  }

  public static function commander(string $presidencyId)
  {
    return 'Commander_' . $presidencyId;
  }

  public static function hand(string $playerId)
  {
    return 'hand_' . $playerId;
  }

  public static function familyMemberSupply(string $playerId)
  {
    return 'supply_' . $playerId;
  }

  // public static function officers($presidencyId)
  // {
  //   return 'Officers_' . $presidencyId;
  // }

  public static function officerInTraining()
  {
    return OFFICER_IN_TRAINING;
  }

  public static function pensioners()
  {
    return PENSIONERS;
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

  public static function shipUnderConstruction(string $regionId)
  {
    return 'shipConstruction_' . $regionId;
  }

  public static function playedBlackmailCards(string $playerId)
  {
    return 'playedBlackmailCards_' . $playerId;
  }

  public static function presidency(string $regionId)
  {
    return $regionId . 'Presidency';
  }

  public static function setupCards(string $playerId)
  {
    return 'setupCards_' . $playerId;
  }

  public static function writers(string $presidencyId)
  {
    return 'Writers_' . $presidencyId;
  }

  public static function londonSeasonCards(string $playerId)
  {
    return 'londonSeasonCards_' . $playerId;
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

  public static function familyOffices(string $playerId)
  {
    return FAMILY_OFFICES . '_' . $playerId;
  }

  public static function promiseCards(string $playerId)
  {
    return $playerId;
  }

  public static function revealedLaws()
  {
    return REVEALED_LAWS;
  }

  public static function selectedLaw()
  {
    return SELECTED_LAW;
  }

  public static function passedLaws()
  {
    return PASSED_LAWS;
  }

  public static function powerTokenPosition(int $index)
  {
    return 'position_' . $index;
  }
}
