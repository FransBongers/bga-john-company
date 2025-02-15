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
    return 'writers_' . $presidencyId;
  }

  public static function officers($presidencyId)
  {
    return 'officers_' . $presidencyId;
  }

  public static function commander($presidencyId)
  {
    return 'commander_' . $presidencyId;
  }
}
