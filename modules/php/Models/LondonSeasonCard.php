<?php

namespace Bga\Games\JohnCompany\Models;

class LondonSeasonCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'london_season_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;
  protected $used;

  protected $title;
  protected $type;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
    'used' => ['used', 'int'],
  ];

  protected $staticAttributes = [
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

}
