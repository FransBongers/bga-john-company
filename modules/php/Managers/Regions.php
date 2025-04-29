<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class Regions extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'regions';
  protected static $prefix = 'region_';
  protected static $customFields = [
    'looted',
    'unrest',
    'strength',
    'control',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['region_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    $className = "\Bga\Games\JohnCompany\Regions\\$id";
    return new $className($data);
  }

  /**
   * getStaticUiData : return static data
   */
  public static function getStaticUiData()
  {
    $pieces = self::getAll()->toArray();

    $data = [];
    foreach ($pieces as $index => $piece) {
      $data[$piece->getId()] = $piece->getStaticData();
    }
    return $data;
  }


  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......


  public static function setupNewGame($players = null, $options = null)
  {
    $scenarioData = Scenarios::get()->getRegions();

    $regions = [];
    $empires = [];
    foreach (REGIONS as $regionId) {

      $regions[$regionId] = [
        'id' => $regionId,
        'location' => 'India',
        'strength' => $scenarioData[$regionId]['strength'],
        'control' => isset($scenarioData[$regionId]['control']) ? $scenarioData[$regionId]['control'] : null,
      ];

      if (isset($scenarioData[$regionId]['isCapital']) && $scenarioData[$regionId]['isCapital']) {
        $empires[] = $regionId;
      }
    }

    self::create($regions, null);

    for ($i = 0; $i < 3; $i++) {
      if (!isset($empires[$i])) {
        $empires[$i] = null;
      }
    }
    Globals::setEmpires($empires);
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...


}
