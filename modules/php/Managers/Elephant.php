<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class Elephant
{

  public static function get($key = null)
  {
    $item = Globals::getElephant();
    if ($key === null) {
      return $item;
    } else {
      return $item[$key];
    }
  }

  private static function set($key, $value)
  {
    $item = Globals::getElephant();
    $item[$key] = $value;
    Globals::setElephant($item);
  }

  private static function inc($key, $value)
  {
    $item = Globals::getElephant();
    $item[$key] += $value;
    Globals::setElephant($item);
    return $item[$key];
  }

  public static function setupNewGame()
  {
    $scenario = Scenarios::get();

    Globals::setElephant($scenario->getElephant());
  }

  public static function getFacing()
  {
    return Globals::getElephant()[FACING];
  }

  public static function getLocation()
  {
    return Globals::getElephant()[LOCATION];
  }

  /**
   * Elephant march for sovereign region
   */
  private static function getRegionBasedOnShape($region, $shape)
  {
    $regions = Regions::getAll();
    $adjacentRegionIdForShape = $region->getAdjacentRegionIdByShape($shape);
    if ($regions[$adjacentRegionIdForShape]->getControl() !== $region->getId()) {
      Globals::setElephant([
        LOCATION => $region->getBorderWith($adjacentRegionIdForShape),
        FACING => $adjacentRegionIdForShape,
      ]);
      return;
    }

    $numberOfAdjacentRegions = count($region->getAdjacentRegionsInClockwiseOrder());
    $adjacentRegionId = $adjacentRegionIdForShape;
    for ($i = 0; $i < $numberOfAdjacentRegions; $i++) {
      $adjacentRegionId = $region->getNextAdjacentRegionIdInClockwiseOrder($adjacentRegionId);
      if ($regions[$adjacentRegionId]->getControl() !== $region->getId()) {
        Globals::setElephant([
          LOCATION => $region->getBorderWith($adjacentRegionId),
          FACING => $adjacentRegionId,
        ]);
      }
      return;
    }

    Globals::setElephant([
      LOCATION => $region->getBorderWith($adjacentRegionIdForShape),
      FACING => $region->getId(),
    ]);
  }

  /**
   * if capitalRegionId is set there was a successful Invasion Crisis and
   * elephant needs to be moved to the capitals's region (Imperial Ambitions);
   */
  public static function march($shape, $capitalRegionId = null)
  {
    $regionId = $capitalRegionId === null ? EventTiles::getRegionIdForEvent() : $capitalRegionId;

    $region = Regions::get($regionId);

    if ($region->isCompanyControlled()) {
      Globals::setElephant([
        LOCATION => $regionId,
        FACING => '',
      ]);
    } else if ($region->isDominatedByRegion()) {
      $sovereign = $region->getControl();
      Globals::setElephant([
        LOCATION => $region->getBorderWith($sovereign),
        FACING => $sovereign,
      ]);
    } else {
      self::getRegionBasedOnShape($region, $shape);
    }

    Notifications::elephantMarch(self::get());
  }
}
