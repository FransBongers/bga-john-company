<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class Ships extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'ships';
  protected static $prefix = 'ship_';
  protected static $customFields = [
    'side',
    'type',
    'owner',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['ship_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);
    $className = "\Bga\Games\JohnCompany\Ships\\$id";
    if (Utils::startsWith($id, 'ship')) {
      $type = $data['type'];
      $className = "\Bga\Games\JohnCompany\Ships\\$type";
    }
    return new $className($data);
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
    $ships = [];
    foreach (SHIP_NAMES as $shipId) {
      $ships[$shipId] = [
        'id' => $shipId,
        'location' => SUPPLY_PLAYER_SHIPS,
        'type' => PLAYER_OWNED_SHIP,
        'side' => FULL,
      ];
    }

    self::create($ships, null);
    self::create([
      [
        "id" => "ship_" . "{INDEX}",
        "nbr" => 14,
        "nbrStart" => 1,
        'location' => SUPPLY_OTHER_SHIPS,
        'type' => OTHER_SHIP,
        'side' => COMPANY_SHIP,
      ]
    ]);
    self::shuffle(SUPPLY_OTHER_SHIPS);
    self::shuffle(SUPPLY_PLAYER_SHIPS);
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  public static function getOtherShipFromSupply($shipType)
  {
    $ship = self::getTopOf(Locations::supplyOtherShips());
    if ($ship === null) {
      throw new \feException("ERROR_038");
    }
    $ship->setType($shipType);
    return $ship;
  }

  public static function getShipsInSeaZones()
  {
    return Utils::filter(self::getAll()->toArray(), function ($ship) {
      return in_array($ship->getLocation(), SEA_ZONES);
    });
  }
}
