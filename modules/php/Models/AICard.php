<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Managers\AICards;

class AICard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'ai_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;
  // Back of card
  protected $directionOrder = [];
  protected $presidencyOrder = [];
  // Front of card
  protected $cardPriority = [];
  protected $directionPriority = [];
  protected $presidencyPriority = [];
  protected $regionPriority = [];
  

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
  ];

  protected $staticAttributes = [
    'id',
    'directionOrder',
    'presidencyOrder',
    'cardPriority',
    'directionPriority',
    'presidencyPriority',
    'regionPriority',
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

  public function getClimate(): string
  {
    return BULL;
  }

  public function insertOnTop($location)
  {
    $this->location = $location;
    AICards::insertOnTop($this->getId(), $location);
  }
}
