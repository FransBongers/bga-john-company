<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;


class LondonSeasonCards extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'london_season_cards';
  protected static $prefix = 'card_';
  protected static $customFields = [
    'used',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getCardInstance($card['card_id'], $card);
  }

  public static function getCardInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    $className = Utils::startsWith($id, BLACKMAIL) ? "\Bga\Games\JohnCompany\Cards\Blackmail\\$id" :  "\Bga\Games\JohnCompany\Cards\Prestige\\$id";
    return new $className($data);
  }

  /**
   * getStaticUiData : return static data
   */
  public static function getStaticUiData()
  {
    $pieces = self::getAll()->toArray();

    $data = [];
    foreach ($pieces as $index => $piece) {
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


  private static function setupLoadCards()
  {
    // Load list of cards
    include dirname(__FILE__) . '/../Cards/Blackmail/list.inc.php';
    include dirname(__FILE__) . '/../Cards/Prestige/list.inc.php';

    $cards = [];

    // return;
    foreach ($blackmailCardIds as $index => $cId) {
      $cards[$cId] = [
        'id' => $cId,
        'location' => Locations::londonSeasonPool(BLACKMAIL),
      ];
    }

    foreach ($prestigeCardIds as $index => $cId) {
      $cards[$cId] = [
        'id' => $cId,
        'location' => Locations::londonSeasonPool(PRESTIGE),
      ];
    }

    // Create the cards
    self::create($cards, null);
    self::shuffle(Locations::londonSeasonPool(BLACKMAIL));
    self::shuffle(Locations::londonSeasonPool(PRESTIGE));
  }


  /* Creation of the cards */
  public static function setupNewGame($players = null, $options = null)
  {
    self::setupLoadCards();
  }
}
