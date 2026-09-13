<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;


class LondonSeasonCards extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'london_season_cards';
  protected static $prefix = 'card_';
  protected static $customFields = [
    'extra_data',
    'public_id',
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

    $className = Utils::startsWith($id, PRESTIGE) ? "\Bga\Games\JohnCompany\Cards\Prestige\\$id" :  "\Bga\Games\JohnCompany\Cards\Blackmail\\$id";
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

  public static function setupLoadBlackmailCards()
  {
    // Load list of cards
    include dirname(__FILE__) . '/../Cards/Blackmail/list.inc.php';

    $cards = [];

    shuffle($blackmailCardIds);
    foreach ($blackmailCardIds as $index => $cId) {
      $publicId = 'BlackmailCard_' . ($index + 1);
      $cards[$cId] = [
        'id' => $cId,
        'location' => Locations::londonSeasonPool(BLACKMAIL),
        'public_id' => $publicId,
      ];
    }

    Notifications::log('setupLoadBlackmailCards', $cards);

    // Create the cards
    self::create($cards, null);
    self::shuffle(Locations::londonSeasonPool(BLACKMAIL));
  }

  private static function setupLoadPrestigeCards()
  {
    include dirname(__FILE__) . '/../Cards/Prestige/list.inc.php';

    $cards = [];

    foreach ($prestigeCardIds as $index => $cId) {
      $cards[$cId] = [
        'id' => $cId,
        'location' => Locations::londonSeasonPool(PRESTIGE),
        'public_id' => $cId,
      ];
    }

    // Create the cards
    self::create($cards, null);
    self::shuffle(Locations::londonSeasonPool(PRESTIGE));
  }


  /* Creation of the cards */
  public static function setupNewGame($players = null, $options = null)
  {
    self::setupLoadBlackmailCards();
    self::setupLoadPrestigeCards();
    self::setupLondonSeasonDisplay();
  }

  // TODO: do after draft
  public static function setupLondonSeasonDisplay()
  {
    self::moveAllInLocation(Locations::londonSeasonPool(BLACKMAIL), DECK);
    self::moveAllInLocation(Locations::londonSeasonPool(PRESTIGE), DECK);
    self::shuffle(DECK);
    self::pickForLocation(3, DECK, LONDON_SEASON_DISPLAY);
    self::shuffle(LONDON_SEASON_DISPLAY);
  }
}
