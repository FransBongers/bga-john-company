<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\EventTiles;

class EventTile extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'event_tiles';
  protected $primary = 'event_tile_id';
  protected $location;
  protected $state;

  protected $title;
  protected $type;
  protected $regionId; // Back of tile
  protected $shape = null; // Front of tile
  protected $background; // Front of tile

  protected $attributes = [
    'id' => ['event_tile_id', 'str'],
    'location' => 'event_tile_location',
    'state' => ['event_tile_state', 'int'],
  ];

  protected $staticAttributes = [
    'regionId',
    'title',
    'type',
    'shape',
    'background',
  ];
  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function resolveEvent(string $regionId, $ctx)
  {
  }

  public function getNotificationText()
  {
    return clienttranslate('${tkn_boldText_eventTitle} in ${tkn_boldText_region}');
  }

  public function draw()
  {
    $this->state = EventTiles::insertOnTop($this->getId(), DISCARD);
    $this->location = DISCARD;

    Notifications::drawEventTile($this);
  }
}
