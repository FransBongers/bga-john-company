<?php

namespace Bga\Games\JohnCompany\Models;

class Office extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'offices';
  protected $primary = 'office_id';
  protected $location;
  protected $state;
  protected $treasury = 0;
  protected $hirePriority;
  protected $title;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['office_id', 'str'],
    'location' => 'office_location',
    'state' => ['office_state', 'int'],
    'treasury' => ['treasury', 'int'],
    'familyMemberId' => ['family_member_id', 'str'],
  ];

  protected $staticAttributes = [
    'hirePriority',
    'title',
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
