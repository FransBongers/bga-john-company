<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class Offices extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'offices';
  protected static $prefix = 'office_';
  protected static $customFields = [
    'treasury',
    'family_member_id',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['office_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    $className = "\Bga\Games\JohnCompany\Offices\\$id";
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
    $offices = [];
    foreach (OFFICES as $officeId) {
      // TODO: set location based on scenario
      $offices[$officeId] = [
        'id' => $officeId,
        'location' => 'inPlay',
      ];
    }

    self::create($offices, null);
  }
}
