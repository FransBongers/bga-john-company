<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class Families extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'families';
  protected static $prefix = 'family_';
  protected static $customFields = [
    'treasury',
    'victory_points',
    'opportunity_marker',
    'crown_promise_cubes',
    'has_chairman_marker',
    'is_leader_of_opposition',
    'trophies',
    'law_pieces',
    'spent_on_retirement',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getFamiliyInstance($card['family_id'], $card);
  }

  public static function getFamiliyInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    $className = "\Bga\Games\JohnCompany\Families\\Family$id";
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
    $families = [];
    foreach (FAMILIES as $familyId) {
      if (Utils::array_some($players, function ($player) use ($familyId) {
        return FAMILY_COLOR_MAP[$familyId] ===  HEX_COLOR_COLOR_MAP[$player->getColor()];
      }))
        $families[$familyId] = [
          'id' => $familyId,
          'location' => 'London',
        ];
    }
    if (count($players) <= 2) {
      $families[CROWN] = [
        'id' => CROWN,
        'location' => 'London',
      ];
    }

    self::create($families, null);
  }
}
