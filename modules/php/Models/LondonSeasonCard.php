<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;

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
  protected $publicId;
  protected $background;
  protected $subtype;
  protected $text = [];
  protected $textNote = null;
  protected $enterpriseType = null;
  protected $victoryPoints = null;
  protected $power = null;
  protected $discount = null;
  protected $windows = null;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
    'extraData' => ['extra_data', 'obj'],
    'publicId' => ['public_id', 'str'],
    'used' => ['used', 'int'],
  ];

  protected $staticAttributes = [
    'title',
    'type',
    'background',
    'subtype',
    'text',
    'textNote',
    'enterpriseType',
    'victoryPoints',
    'power',
    'discount',
    'windows'
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['id'] = $this->publicId;
    $data['type'] = $this->type;
    unset($data['publicId']);
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function discard($player = null)
  {
    $from = $this->getLocation();
    $this->setLocation(DISCARD);
    Notifications::discardLondonSeasonCard($this, $player, $from);
  }

  public function take(Player $player)
  {
    $from = $this->getLocation();
    $this->setLocation(Locations::londonSeasonCards($player->getFamilyId()));
    Notifications::moveLondonSeasonCard($player, $this, $from);
  }
}
