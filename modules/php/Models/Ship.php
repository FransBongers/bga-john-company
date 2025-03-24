<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

class Ship extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'ships';
  protected $primary = 'ship_id';
  protected $location;
  protected $state;
  protected $fatigued;
  protected $name;

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
  ];

  protected $staticAttributes = [
    'name'
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['fatigued'] = $this->fatigued === 1;
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
}
