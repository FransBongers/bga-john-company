<?php

namespace Bga\Games\JohnCompany\Models;

class Family extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'families';
  protected $primary = 'family_id';
  protected $location;
  protected $state;


  protected $attributes = [
    'id' => ['family_id', 'str'],
    'location' => 'family_location',
    'state' => ['family_state', 'int'],
  ];


  public function jsonSerialize()
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
