<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class ArmyPieces extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'army_pieces';
  protected static $prefix = 'army_piece_';
  protected static $customFields = [];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['army_piece_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $type = $data['type'];
    // $className = "\Bga\Games\JohnCompany\ArmyPieces\\$type";
    $id = Utils::startsWith($id, REGIMENT) ? REGIMENT : $id;
    $className = "\Bga\Games\JohnCompany\ArmyPieces\\$id";
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


  public static function setupNewGame()
  {
    $startingRegiments = Scenarios::get()->getStartingRegiments();

    self::create([
      [
        "id" => REGIMENT . "_{INDEX}",
        "nbr" => 20,
        "nbrStart" => 1,
        'location' => Locations::supplyRegiments(),
      ],
    ]);

    self::shuffle(Locations::supplyRegiments());

    foreach (HOME_REGIONS as $regionId) {
      self::pickForLocation($startingRegiments, Locations::supplyRegiments(), Locations::armyOfReady($regionId));
    }

    $localAlliances = [];
    // return;
    foreach (LOCAL_ALLIANCES as $index => $pieceId) {
      $piece = self::getInstance($pieceId);

      $localAlliances[$pieceId] = [
        'id' => $pieceId,
        'location' => Locations::armyOfExhausted($piece->getRegion()),
      ];
    }

    self::create($localAlliances, null);
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  public static function getRegiments()
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'id', 'LIKE', 'Regiment_' . '%')
      ->get();
  }

  public static function getRegimentsInArmies()
  {
    $regiments = self::getRegiments()->toArray();

    $armyLocations = array_map(function ($regionId) {
      return Locations::armyOfReady($regionId);
    }, HOME_REGIONS);

    return Utils::filter($regiments, function ($regiment) use ($armyLocations) {
      return in_array($regiment->getLocation(), $armyLocations);
    });
  }
}
