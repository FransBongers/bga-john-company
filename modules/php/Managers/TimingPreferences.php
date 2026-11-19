<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Manager;

class TimingPreferences extends DB_Manager
{
  protected static $table = 'timing_preferences';
  protected static $primary = 'id';
  protected static $log = false;

  public static function forPlayer(int $playerId): array
  {
    $preferences = ['window' => [], 'card' => []];
    foreach (self::DB()->where('player_id', $playerId)->get() as $row) {
      $preferences[$row['kind']][$row['item_id']] = (bool) $row['enabled'];
    }
    return $preferences;
  }

  public static function set(int $playerId, string $kind, string $itemId, bool $enabled): void
  {
    if (($kind === 'window' && !$enabled) || ($kind === 'card' && $enabled)) {
      self::DB()->delete()->where('player_id', $playerId)->where('kind', $kind)->where('item_id', $itemId)->run();
      return;
    }
    if ($kind === 'window' && $enabled) {
      $parts = explode(':', $itemId, 2);
      if (in_array($parts[0], [BEFORE_OFFICE_ACTS, AFTER_OFFICE_FINISHED_ACTING], true)) {
        $offices = Offices::getAll();
        $office = $offices[$parts[1] ?? ''] ?? null;
        if ($office === null || !$office->isInPlay()) {
          throw new \BgaUserException(clienttranslate('This office is not in play'));
        }
      }
    }
    self::DB()->insert([
      'player_id' => $playerId,
      'kind' => $kind,
      'item_id' => $itemId,
      'enabled' => $enabled ? 1 : 0,
    ], true);
  }

  public static function removeOfficeWindows(string $officeId): void
  {
    foreach ([BEFORE_OFFICE_ACTS, AFTER_OFFICE_FINISHED_ACTING] as $window) {
      self::DB()->delete()->where('kind', 'window')->where('item_id', $window . ':' . $officeId)->run();
    }
  }

  public static function windowKey(string $window, array $timingData): string
  {
    if ($window === START_OF_PHASE || $window === END_OF_PHASE) {
      return $window . ':' . ($timingData[PHASE_ID] ?? '');
    }
    if ($window === BEFORE_OFFICE_ACTS || $window === AFTER_OFFICE_FINISHED_ACTING) {
      return $window . ':' . ($timingData[OFFICE_ID] ?? '');
    }
    return $window;
  }
}