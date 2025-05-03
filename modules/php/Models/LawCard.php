<?php

namespace Bga\Games\JohnCompany\Models;

class LawCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'law_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;


  protected $title;
  // protected $type;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
  ];

  protected $staticAttributes = [
    'title',
    // 'type',
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
