<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Manager;

class Attention extends DB_Manager
{
  protected static $table = 'player_attention';
  protected static $primary = 'id';
  protected static $log = false;

  protected static function cast($row)
  {
    return [
      'id' => (int) $row['id'],
      'kind' => $row['kind'],
      'itemType' => $row['item_type'],
      'itemId' => $row['item_id'],
    ];
  }

  public static function forPlayer(int $playerId): array
  {
    return array_values(self::DB()->where('player_id', $playerId)->get()->toArray());
  }

  public static function create(int $playerId, string $kind, string $itemType, string $itemId): void
  {
    $id = self::DB()->insert([
      'player_id' => $playerId,
      'kind' => $kind,
      'item_type' => $itemType,
      'item_id' => $itemId,
    ]);
    Notifications::attentionAdded($playerId, [
      'id' => $id,
      'kind' => $kind,
      'itemType' => $itemType,
      'itemId' => $itemId,
    ]);
  }

  public static function acknowledge(int $playerId, array $ids): void
  {
    $ids = array_values(array_unique(array_filter($ids, fn($id) => is_int($id) && $id > 0)));
    if (!$ids) {
      return;
    }
    self::DB()->delete()->where('player_id', $playerId)->whereIn($ids)->run();
    Notifications::attentionCleared($playerId, $ids);
  }

  public static function removeItem(string $itemType, string $itemId): void
  {
    self::DB()->delete()->where('item_type', $itemType)->where('item_id', $itemId)->run();
  }
}