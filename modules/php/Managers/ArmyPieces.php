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
  protected static $customFields = [
    'exhausted',
  ];
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


  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......


  public static function setupNewGame()
  {
    self::create([
      [
        "id" => REGIMENT . "_{INDEX}",
        "nbr" => 20,
        "nbrStart" => 1,
        'location' => Locations::regimentsSupply(),
        'exhausted' => 0,
      ],
    ]);

    $localAlliances = [];
    // return;
    foreach (LOCAL_ALLIANCES as $index => $pieceId) {
      $piece = self::getInstance($pieceId);

      $localAlliances[$pieceId] = [
        'id' => $pieceId,
        'location' => $piece->getRegion(),
        'exhausted' => 1,
      ];
    }

    self::create($localAlliances, null);
  }
}
