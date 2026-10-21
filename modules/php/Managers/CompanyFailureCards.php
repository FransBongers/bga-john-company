<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Models\CompanyFailureCard;

class CompanyFailureCards extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'company_failure_cards';
  protected static $prefix = 'card_';
  protected static $customFields = [];
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

    $className = "\Bga\Games\JohnCompany\Cards\CompanyFailure\\$id";
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
    include dirname(__FILE__) . '/../Cards/CompanyFailure/list.inc.php';

    $cards = [];
    foreach ($companyFailureCardIds as $cardId) {
      $cards[$cardId] = [
        'id' => $cardId,
        'location' => DECK,
      ];
    }

    self::create($cards, null);
    self::shuffle(DECK);
  }
}
