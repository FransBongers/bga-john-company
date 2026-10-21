<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Models\PromiseCard;

class PromiseCards extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'promise_cards';
  protected static $prefix = 'card_';
  protected static $customFields = ['type', 'family_id'];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($card)
  {
    return self::getCardInstance($card['card_id'], $card);
  }

  public static function getCardInstance($id, $data = null)
  {
    $type = explode('_', $id)[2];
    $className = "\Bga\Games\JohnCompany\Cards\Promise\\$type";
    return new $className($data);
  }

  public static function getStaticUiData()
  {
    $data = [];
    foreach (self::getAll() as $card) {
      $data[$card->getId()] = $card->getStaticData();
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
    $cards = [];

    $players = Players::getAll();

    foreach ($players as $playerId => $player) {
      $familyId = $player->getFamilyId();
      foreach (PROMISE_CARD_TYPES as $type) {
        $cId = implode('_', ['PC', $player->getId(), $type]);
        $cards[$cId] = [
          'id' => $cId,
          'location' => Locations::promiseCards($familyId),
          'type' => $type,
          'family_id' => $familyId,
        ];
      }
    }

    // Create the cards
    self::create($cards, null);
    self::shuffle(DECK);
  }
}
