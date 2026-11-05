<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Models\Deal;

class Deals extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'deals';
  protected static $prefix = 'deal_';
  protected static $customFields = [
    'description',
    'assets',
    'offered_by_family_id',
    'family_id',
    'status',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  // protected static $autoIncrement = true;

  protected static function cast($row)
  {
    return self::getInstance($row['deal_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    return new Deal($data);
  }

  public static function getStaticUiData()
  {
    $data = [];
    foreach (self::getAll() as $deal) {
      $data[$deal->getId()] = $deal->getStaticData();
    }

    return $data;
  }

  public static function setupNewGame($players = null, $options = null) {}

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public static function newDeal(string $familyId, string $offeredByFamilyId, string $description = '', $assets = null)
  {
    return self::singleCreate([
      'description' => $description,
      'assets' => $assets,
      'location' => 'deals',
      'offered_by_family_id' => $offeredByFamilyId,
      'family_id' => $familyId,
      'status' => DEAL_STATUS_OFFER
    ]);
  }
}
