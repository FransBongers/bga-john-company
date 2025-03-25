<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Players;

class Ship extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'ships';
  protected $primary = 'ship_id';
  protected $location;
  protected $state;
  protected $fatigued;
  protected $name;
  protected $owner = null;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['ship_id', 'str'],
    'location' => 'ship_location',
    'state' => ['ship_state', 'int'],
    'fatigued' => ['fatigued', 'int'],
    'type' => ['type', 'str'],
    'owner' => ['owner', 'int'],
  ];

  protected $staticAttributes = [
    'name'
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['name'] = $this->getName();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function moveTo($player, $newLocation)
  {
    $from = $this->getLocation();
    $this->setLocation($newLocation);
    Notifications::moveShip($player, $this, $from);
  }

  public function isUnfitted()
  {
    return Utils::startsWith($this->getLocation(), SHIPYARD);
  }

  public function isOtherShip()
  {
    return Utils::startsWith($this->getId(), 'ship');
  }

  public function isInSupply()
  {
    return Utils::startsWith($this->getLocation(), 'supply');
  }

  public function getOwner() {
    return $this->owner === null ? null : Players::get($this->owner);
  }

  public function place($player, $location, $type = null) {
    $this->setLocation($location);
    if ($type !== null) {
      $this->setType($type);
    }
    Notifications::placeShip($player, $this);
  }
}
