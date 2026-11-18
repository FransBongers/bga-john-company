<?php

namespace Bga\Games\JohnCompany\Models;

class Deal extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'deals';
  protected $primary = 'deal_id';
  protected $location;
  protected $state;
  protected $description;
  protected $assets;
  protected $offeredByPlayerId;
  protected $playerId;
  protected $status;
  protected $reports;

  protected $attributes = [
    'id' => ['deal_id', 'str'],
    'location' => ['deal_location', 'str'],
    'state' => ['deal_state', 'int'],
    'description' => ['description', 'str'],
    'assets' => ['assets', 'obj'],
    'offeredByPlayerId' => ['offered_by_player_id', 'int'],
    'playerId' => ['player_id', 'int'],
    'status' => ['status', 'str'],
    'reports' => ['deal_reports', 'obj'],
  ];

  protected $staticAttributes = [];

  public function jsonSerialize(): array
  {
    return parent::jsonSerialize();
  }

  public function getUiData()
  {
    return $this->jsonSerialize();
  }
}