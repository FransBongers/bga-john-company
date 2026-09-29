<?php

namespace Bga\Games\JohnCompany\Models;

class ArmyPiece extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'army_pieces';
  protected $primary = 'army_piece_id';
  protected $location;
  protected $state;
  protected $name;
  protected $cost = 0;
  protected $type;
  protected $strength = 1;
  protected $presidencyId = null;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['army_piece_id', 'str'],
    'location' => 'army_piece_location',
    'state' => ['army_piece_state', 'int'],
  ];

  protected $staticAttributes = [
    'name',
    'cost',
    'presidencyId',
    'strength',
    'type'
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
