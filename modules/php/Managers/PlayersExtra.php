<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\PlayerExtra;

class PlayersExtra extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'players_extra';
  protected static $prefix = 'player_';
  protected static $customFields = [
    'treasury',
    'victory_points',
    'opportunity_marker',
    'crown_promise_cubes',
    'has_chairman_marker',
    'trophies',
    'passed_law_tokens',
    'family_id',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getFamiliyInstance($card['player_id'], $card);
  }

  public static function getFamiliyInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    // $className = "\Bga\Games\JohnCompany\Families\\Family$id";
    return new PlayerExtra($data);
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
    $players = Players::getAll();
    $families = [];
    $crownInTheGame = count($players) <= 2;
    

    foreach ($players as $playerId => $player) {
      $familyId = COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[$player->getColor()]];
      $families[$playerId] = [
        'id' => $playerId,
        'location' => 'London',
        'family_id' => $familyId,
        'crown_promise_cubes' => $crownInTheGame ? 12 / (count($players) + 1) : 0,
      ];
    }

    if ($crownInTheGame) {
      $families[CROWN_PLAYER_ID] = [
        'id' => CROWN_PLAYER_ID,
        'location' => 'London',
        'family_id' => CROWN,
        'crown_promise_cubes' => 12 / (count($players) + 1),
      ];
    }

    self::create($families, null);
  }

  public static function getChairmanPlayer(): PlayerExtra
  {
    $playerExtraData = self::getAll()->toArray();
    return Utils::array_find($playerExtraData, fn($playerExtra) => $playerExtra->hasChairmanMarker());
  }
}
