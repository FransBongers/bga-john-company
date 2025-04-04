<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core;

use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;

class Stats extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Manager
{
  protected static $table = 'stats';
  protected static $primary = 'stats_id';
  protected static function cast($row)
  {
    return [
      'id' => $row['stats_id'],
      'type' => $row['stats_type'],
      'playerId' => $row['stats_player_id'],
      'value' => $row['stats_value'],
    ];
  }

  /*
   * Create and store a stat declared but not present in DB yet
   *  (only happens when adding stats while a game is running)
   */
  public static function checkExistence()
  {
    $default = [
      'int' => 0,
      'float' => 0,
      'bool' => false,
      'str' => '',
    ];

    // Fetch existing stats, all stats
    $stats = Game::get()->getStatTypes();
    $existingStats = self::DB()
      ->get()
      ->map(function ($stat) {
        return $stat['type'] . ',' . ($stat['playerId'] == null ? 'table' : 'player,' . $stat['playerId']);
      })
      ->toArray();

    $values = [];
    // Deal with table stats first
    foreach ($stats['table'] as $stat) {
      if ($stat['id'] < 10) {
        continue;
      }

      if (!in_array($stat['id'] . ',table', $existingStats)) {
        $values[] = [
          'stats_type' => $stat['id'],
          'stats_player_id' => null,
          'stats_value' => $default[$stat['type']],
        ];
      }
    }

    // Deal with player stats
    $players = Players::getAll();
    // $playerIds = Players::getAll()->getIds();

    foreach ($players as $playerId => $player) {
      foreach ($stats['player'] as $stat) {
        $statId = $stat['id'];
        if ($statId < 10) {
          continue;
        }
        $faction = $player->getFaction();

        // if ((in_array($statId, STATS_SIDE_SPECIFIC[BRITISH]) || in_array($statId, STATS_SIDE_SPECIFIC[FRENCH]))
        //   && !in_array($statId, STATS_SIDE_SPECIFIC[$faction])
        // ) {
        //   continue;
        // }

        if (!in_array($statId . ',player,' . $playerId, $existingStats)) {
          $value = $default[$stat['type']];
          $values[] = [
            'stats_type' => $statId,
            'stats_player_id' => $playerId,
            'stats_value' => $value,
          ];
        }
      }
    }

    // Insert if needed
    if (!empty($values)) {
      self::DB()
        ->multipleInsert(['stats_type', 'stats_player_id', 'stats_value'])
        ->values($values);
    }
  }

  public static function getUiData()
  {
    return self::DB()
      ->get()
      ->toArray();
  }

  protected static function getFilteredQuery($id, $playerId)
  {
    $query = self::DB()->where('stats_type', $id);
    if (is_null($playerId)) {
      $query = $query->whereNull('stats_player_id');
    } else {
      $query = $query->where('stats_player_id', is_int($playerId) ? $playerId : $playerId->getId());
    }
    return $query;
  }

  /*
   * Magic method that intercept not defined static method and do the appropriate stuff
   */
  public static function __callStatic($method, $args)
  {
    if (preg_match('/^([gs]et|inc)([A-Z])(.*)$/', $method, $match)) {
      $stats = Game::get()->getStatTypes();

      // Sanity check : does the name correspond to a declared variable ?
      $name = mb_strtolower($match[2]) . $match[3];
      $isTableStat = \array_key_exists($name, $stats['table']);
      $isPlayerStat = \array_key_exists($name, $stats['player']);
      if (!$isTableStat && !$isPlayerStat) {
        throw new \InvalidArgumentException("Statistic {$name} doesn't exist");
      }

      if ($match[1] == 'get') {
        // Basic getters
        $id = null;
        $playerId = null;
        if ($isTableStat) {
          $id = $stats['table'][$name]['id'];
        } else {
          if (empty($args)) {
            throw new \InvalidArgumentException("You need to specify the player for the stat {$name}");
          }
          $id = $stats['player'][$name]['id'];
          $playerId = $args[0];
        }

        $row = self::getFilteredQuery($id, $playerId)->get(true);
        return $row['value'];
      } elseif ($match[1] == 'set') {
        // Setters in DB and update cache
        $id = null;
        $playerId = null;
        $value = null;

        if ($isTableStat) {
          $id = $stats['table'][$name]['id'];
          $value = $args[0];
        } else {
          if (count($args) < 2) {
            throw new \InvalidArgumentException("You need to specify the player for the stat {$name}");
          }
          $id = $stats['player'][$name]['id'];
          $playerId = $args[0];
          $value = $args[1];
        }

        if (self::getFilteredQuery($id, $playerId)->count() == 0) {
          self::DB()->insert(['stats_type' => $id, 'stats_player_id' => $playerId, 'stats_value' => $value]);
        } else {
          self::getFilteredQuery($id, $playerId)
            ->update(['stats_value' => $value])
            ->run();
        }
        return $value;
      } elseif ($match[1] == 'inc') {
        $id = null;
        $playerId = null;
        $value = null;

        if ($isTableStat) {
          $id = $stats['table'][$name]['id'];
          $value = $args[0] ?? 1;
        } else {
          if (count($args) < 1) {
            throw new \InvalidArgumentException("You need to specify the player for the stat {$name}");
          }
          $id = $stats['player'][$name]['id'];
          $playerId = $args[0];
          $value = $args[1] ?? 1;
        }

        self::getFilteredQuery($id, $playerId)
          ->inc(['stats_value' => $value])
          ->run();
        return $value;
      }
    }
    return null;
  }
}
