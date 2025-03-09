<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;



/*
 * Players manager : allows to easily access players ...
 *  a player is an instance of Player class
 */

class Players extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Manager
{
  protected static $table = 'player';
  protected static $primary = 'player_id';
  protected static function cast($row)
  {
    return new \Bga\Games\JohnCompany\Models\Player($row);
  }

  public static function getCrown()
  {
    return self::cast([
      'player_id' => CROWN_PLAYER_ID,
      'player_ai' => "0",
      'player_no' => 3,
      'player_avatar' => "000000",
      'player_beginner' => null,
      'player_name' => clienttranslate('The Crown'),
      'player_color' => Globals::getCrown()['color'],
      'player_eliminated' => '0',
      'player_score' => '0',
      'player_score_aux' => '0',
      'player_zombie' => '0',
    ]);
  }

  public static function setupNewGame($players, $options)
  {
    // Globals::setPlayers($players);
    // Create players
    $gameInfos = Game::get()->getGameinfos();
    $colors = $gameInfos['player_colors'];
    $query = self::DB()->multipleInsert([
      'player_id',
      'player_color',
      'player_canal',
      'player_name',
      'player_avatar',
      'player_score',
    ]);

    $values = [];

    foreach ($players as $playerId => $player) {
      $color = array_shift($colors);

      $values[] = [$playerId, $color, $player['player_canal'], $player['player_name'], $player['player_avatar'], 0];
    }

    $query->values($values);

    Game::get()->reattributeColorsBasedOnPreferences($players, $gameInfos['player_colors']);
    Game::get()->reloadPlayersBasicInfos();
    // PlayersExtra::setupNewGame();

    if (Globals::getCrownInGame()) {
      Globals::setCrown([
        'color' => self::getUnusedColor(),
      ]);
    }
  }

  private static function getUnusedColor()
  {
    $colors = Game::get()->getGameinfos()['player_colors'];
    $players = self::getAll()->toArray();

    $remainingColors = Utils::filter($colors, function ($color) use ($players) {
      return !Utils::array_some($players, function ($player) use ($color) {
        return $player->getColor() === $color;
      });
    });
    shuffle($remainingColors);
    return $remainingColors[0];
  }

  public static function getActiveId()
  {
    return (int) Game::get()->getActivePlayerId();
  }

  public static function getCurrentId()
  {
    return intval(Game::get()->getCurrentPId());
  }

  public static function getAll()
  {
    $players = self::DB()->get(false);
    return $players;
  }

  /*
   * get : returns the Player object for the given player ID
   */
  public static function get($playerId = null)
  {
    if ($playerId === CROWN_PLAYER_ID) {
      return self::getCrown();
    }
    $playerId = $playerId ?: self::getActiveId();
    return self::DB()
      ->where($playerId)
      ->getSingle();
  }


  public static function incScore($playerId, $increment)
  {
    $value = self::get($playerId)->getScore() + $increment;
    return self::DB()->update(['player_score' => $value], $playerId);
  }

  public static function setPlayerScoreAux($playerId, $value)
  {
    return self::DB()->update(['player_score_aux' => $value], $playerId);
  }

  public static function setPlayerScore($playerId, $value)
  {
    return self::DB()->update(['player_score' => $value], $playerId);
  }


  public function getMany($playerIds)
  {
    $players = self::DB()
      ->whereIn($playerIds)
      ->get();
    return $players;
  }

  public static function getActive()
  {
    return self::get();
  }

  public static function getCurrent()
  {
    return self::get(self::getCurrentId());
  }

  public static function getNextId($player)
  {
    $playerId = is_int($player) ? $player : $player->getId();

    $table = Game::get()->getNextPlayerTable();
    return (int) $table[$playerId];
  }

  public static function getPrevId($player)
  {
    $playerId = is_int($player) ? $player : $player->getId();

    $table = Game::get()->getPrevPlayerTable();
    $playerId = (int) $table[$playerId];

    return $playerId;
  }

  /*
   * Return the number of players
   */
  public static function count()
  {
    return self::DB()->count();
  }

  /*
   * getUiData : get all ui data of all players
   */
  public static function getUiData($playerId)
  {
    $data = self::getAll()->map(function ($player) use ($playerId) {
      return $player->jsonSerialize($playerId);
    });

    if (Globals::getCrownInGame()) {
      $data[CROWN_PLAYER_ID] = self::getCrown()->jsonSerialize();
    }

    return $data;
  }


  /*
   * Get current turn order according to first player variable
   */
  public static function getTurnOrder($firstPlayerId = null)
  {
    $players = self::getAll()->toArray();
    if (Globals::getCrownInGame()) {
      $players[] = self::getCrown();
    }
    usort($players, function ($a, $b) {
      return $a->getNo() - $b->getNo();
    });
    $playerOrder = array_map(function ($player) {
      return $player->getId();
    }, $players);

    if (in_array($firstPlayerId, $playerOrder)) {
      while ($playerOrder[0] !== $firstPlayerId) {
        $currentFirst = array_shift($playerOrder);
        $playerOrder[] = $currentFirst;
      }
    }


    return $playerOrder;
  }

  /**
   * This activate next player
   */
  public function activeNext()
  {
    $playerId = self::getActiveId();
    $nextPlayer = self::getNextId((int) $playerId);

    Game::get()->gamestate->changeActivePlayer($nextPlayer);
    return $nextPlayer;
  }

  /**
   * This allow to change active player
   */
  public function changeActive($playerId)
  {
    Game::get()->gamestate->changeActivePlayer($playerId);
  }


  // ..######......###....##.....##.########
  // .##....##....##.##...###...###.##......
  // .##.........##...##..####.####.##......
  // .##...####.##.....##.##.###.##.######..
  // .##....##..#########.##.....##.##......
  // .##....##..##.....##.##.....##.##......
  // ..######...##.....##.##.....##.########

  // .##.....##.########.########.##.....##..#######..########...######.
  // .###...###.##..........##....##.....##.##.....##.##.....##.##....##
  // .####.####.##..........##....##.....##.##.....##.##.....##.##......
  // .##.###.##.######......##....#########.##.....##.##.....##..######.
  // .##.....##.##..........##....##.....##.##.....##.##.....##.......##
  // .##.....##.##..........##....##.....##.##.....##.##.....##.##....##
  // .##.....##.########....##....##.....##..#######..########...######.

  public static function getPlayerForFamily($familyId)
  {
    if ($familyId === CROWN) {
      return self::getCrown();
    }
    $players = self::getAll()->toArray();
    return Utils::array_find($players, function ($player) use ($familyId) {
      return HEX_COLOR_COLOR_MAP[$player->getColor()] === FAMILY_COLOR_MAP[$familyId];
    });
  }

  // // Returns array with $familyId => $playerId
  // public static function getFamilyIdPlayerIdMap()
  // {
  //   $players = self::getAll();
  //   $map = [];
  //   foreach($players as $playerId => $player) {
  //     if ($playerId === CROWN_PLAYER_ID) {
  //       $map[CROWN] = $playerId;
  //       continue;
  //     }
  //     $map[COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[$player->getColor()]]] = $playerId;
  //   }
  //   return $map;
  // }
}
