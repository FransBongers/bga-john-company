<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Regions;

class Shuffle extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $shape;

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Shuffle');
    $this->type = SHUFFLE;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);
    $elephantMarchLast = EventTiles::countInLocation(DECK) === 0;
    if (!$elephantMarchLast) {
      Elephant::march($this->shape);
    }

    // Shuffle this tile in the deck
    EventTiles::move($this->id, DECK);
    EventTiles::shuffle(DECK);

    // Shuffle discard
    EventTiles::shuffle(DISCARD);

    // Move all cards in Discard pile on top of deck
    $tileCountDeck = EventTiles::countInLocation(DECK);
    $tilesInDiscard = EventTiles::getInLocation(DISCARD);
    foreach ($tilesInDiscard as $tileId => $tile) {
      EventTiles::move($tileId, DECK, $tile->getState() + $tileCountDeck);
    }

    if ($elephantMarchLast) {
      Elephant::march($this->shape);
    }
  }
}
