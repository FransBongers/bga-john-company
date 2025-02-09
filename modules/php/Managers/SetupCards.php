<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;


/**
 * Cards
 */
class SetupCards extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'setup_cards';
  protected static $prefix = 'card_';
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

    $className = "\Bga\Games\JohnCompany\Cards\Setup\\$id";
    return new $className($data);
  }



  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......


  private static function setupLoadCards($numberOfPlayers)
  {
    // Load list of cards
    include dirname(__FILE__) . '/../Cards/Setup/list.inc.php';

    $scenarioCards = Scenarios::get()->getSetupCards();
    $numberOfCards = max($numberOfPlayers * 3, 12);

    // return;
    foreach ($setupCardIds as $index => $cId) {
      $card = self::getCardInstance($cId);

      if ($card->getScenarioSetup() === $scenarioCards && $index < $numberOfCards)
      $cards[$cId] = [
        'id' => $cId,
        'location' => DECK,
      ];
    }

    // // Create the cards
    self::create($cards, null);
    self::shuffle(DECK);
  }

  private static function dealSetupCards($families) {
    $numberOfCards = count($families) === 3 ? 4 : 3;

      foreach($families as $family) {
        self::pickForLocation($numberOfCards, DECK, $family->getId());
      }
  }

  /* Creation of the cards */
  public static function setupNewGame($players = null, $options = null)
  {
    $families = Families::getAll();

    self::setupLoadCards(count($families));
    self::dealSetupCards($families);
  }
}
