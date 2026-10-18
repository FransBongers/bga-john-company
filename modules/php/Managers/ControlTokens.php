<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Models\ControlToken;

class ControlTokens extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'control_tokens';
  protected static $prefix = 'control_token_';
  protected static $customFields = [
    'looted',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['control_token_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    return new ControlToken($data);
  }

  public static function getStaticUiData()
  {
    $pieces = self::getAll()->toArray();

    $data = [];
    foreach ($pieces as $piece) {
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

  public static function setupNewGame($players = null, $options = null)
  {
    $controlTokens = [];

    foreach (REGIONS as $regionId) {
      $id = implode('_', [CONTROL_TOKEN, $regionId]);
      $controlTokens[$id] = [
        'id' => $id,
        'location' => Locations::controlToken($regionId),
        'looted' => 0,
      ];
    }

    self::create($controlTokens, null);
  }

  public static function getByRegion(string $regionId)
  {
    $id = implode('_', [CONTROL_TOKEN, $regionId]);
    return self::get($id);
  }
}
