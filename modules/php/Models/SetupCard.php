<?php

namespace Bga\Games\JohnCompany\Models;

class SetupCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'setup_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;
  protected $scenarioSetup;
  protected $items = [];
  protected $extra = false;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
  ];

  protected $staticAttributes = [
    'id',
    'scenarioSetup',
    'items',
    'extra',
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
