<?php

namespace Bga\Games\JohnCompany\Models;

class FamilyMember extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'family_members';
  protected $primary = 'family_member_id';
  protected $location;
  protected $state;
  protected $familyId;
  protected $fatigue;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['family_member_id', 'str'],
    'location' => 'family_member_location',
    'state' => ['family_member_state', 'int'],
    'familyId' => ['family_id', 'str'],
    'fatigue' => ['fatigue', 'int'],
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
