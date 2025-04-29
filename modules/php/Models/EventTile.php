<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

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

  protected $attributes = [
    'id' => ['event_tile_id', 'str'],
    'location' => 'event_tile_location',
    'state' => ['event_tile_state', 'int'],
  ];

  protected $staticAttributes = [
    'regionId',
    'title',
    'type',

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

  public function resolveEvent($regionId)
  {
    Notifications::message('Resolve ${title}. Top of draw stack shows ${regionId}', [
      'title' => $this->title,
      'regionId' => $regionId
    ]);
  }
}
