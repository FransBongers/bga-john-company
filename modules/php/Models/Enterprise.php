<?php

namespace Bga\Games\JohnCompany\Models;

class Enterprise extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'enterprises';
  protected $primary = 'enterprise_id';
  protected $location;
  protected $state;
  protected $name;
  protected $cost;
  protected $income = 0;
  protected $votes = 0;
  protected $victoryPoints = 0;
  protected $windows = 0;
  protected $shipId;
  protected $type;
  protected $invested;
  protected $used;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['enterprise_id', 'str'],
    'location' => 'enterprise_location',
    'state' => ['enterprise_state', 'int'],
    'shipId' => ['ship_id', 'str'],
    'type' => ['type', 'str'],
    'invested' => ['type', 'int'],
    'used' => ['type', 'int'],
  ];

  protected $staticAttributes = [
    'name',
    'cost',
    'income',
    'votes',
    'victoryPoints',
    'windows',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['invested'] = $this->invested === 1;
    $data['used'] = $this->invested === 1;
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function getBonus() {
    return $this->income;
  }

  public function changeOwner($familyId) {
    $this->setLocation($familyId);
  }
}
