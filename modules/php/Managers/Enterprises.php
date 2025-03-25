<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class Enterprises extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'enterprises';
  protected static $prefix = 'enterprise_';
  protected static $customFields = [
    'invested',
    'type',
    'used',
    'ship_id'
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['enterprise_id'], $row);
  }

  public static function getInstance($id, $data)
  {
    $type = $data['type'];
    $className = "\Bga\Games\JohnCompany\Enterprises\\$type";

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
    $shipyards = [];
    foreach (SHIP_NAMES as $index => $shipId) {
      $shipyardId = implode('_', [SHIPYARD, $index + 1]);
      $shipyards[$shipyardId] = [
        'id' => $shipyardId,
        'location' => Locations::enterpriseSupply(SHIPYARD),
        'type' => SHIPYARD,
        'ship_id' => $shipId,
      ];
    }

    self::create($shipyards, null);

    self::create([
      [
        "id" => WORKSHOP . "_{INDEX}",
        "nbr" => 20,
        "nbrStart" => 1,
        'location' => Locations::enterpriseSupply(WORKSHOP),
        'type' => WORKSHOP,
      ],
      [
        "id" => LUXURY . "_{INDEX}",
        "nbr" => 16,
        "nbrStart" => 1,
        'location' => Locations::enterpriseSupply(LUXURY),
        'type' => LUXURY,
      ]
    ]);
    foreach ([LUXURY, SHIPYARD, WORKSHOP] as $enterpriseType) {
      self::shuffle(Locations::enterpriseSupply($enterpriseType));
    }
  }
}
