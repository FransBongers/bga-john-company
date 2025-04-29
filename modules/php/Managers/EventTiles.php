<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\FamilyMember;


class EventTiles extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'event_tiles';
  protected static $prefix = 'event_tile_';
  protected static $customFields = [];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['event_tile_id'], $row);
  }

  public static function getInstance($id, $data)
  {
    $className = "\Bga\Games\JohnCompany\EventTiles\\$id";

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
    // Load list of cards
    include dirname(__FILE__) . '/../EventTiles/list.inc.php';

    $tiles = [];
    Notifications::log('ids', $eventTileIds);
    
    foreach ($eventTileIds as $index => $cId) {
      $tiles[$cId] = [
        'id' => $cId,
        'location' => DECK,
      ];
    }
    Notifications::log('tiles', $tiles);

    self::create($tiles);
    self::shuffle(DECK);
  }

    // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  public static function getRegionIdForEvent()
  {
    $tile = self::getTopOf(DECK);
    return $tile->getRegionId();
  }

  public static function rollStormDie()
  {
    $players = Players::getAll()->toArray();
    // 1. Roll storm die
    $playerToRollTheStormDie = $players[bga_rand(0, count($players) - 1)];

    $side = STORM_DIE[bga_rand(0, 5)];
    Notifications::message(clienttranslate('${player_name} rolls ${tkn_stormDie} with the storm die'), [
      'player' => $playerToRollTheStormDie,
      'tkn_stormDie' => $side
    ]);
    return $side;
  }
}
