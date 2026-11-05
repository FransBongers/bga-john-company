<?php

namespace Bga\Games\JohnCompany\Models;

class Deal extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'deals';
  protected $primary = 'deal_id';
  protected $location;
  protected $state;
  protected $description;
  protected $assets;
  protected $offeredByFamilyId;
  protected $familyId;
  protected $status;

  protected $attributes = [
    'id' => ['deal_id', 'str'],
    'location' => ['deal_location', 'str'],
    'state' => ['deal_state', 'int'],
    'description' => ['description', 'str'],
    'assets' => ['assets', 'obj'],
    'offeredByFamilyId' => ['offered_by_family_id', 'str'],
    'familyId' => ['family_id', 'str'],
    'status' => ['status', 'str'],
  ];

  protected $staticAttributes = [];

  public function jsonSerialize(): array
  {
    return parent::jsonSerialize();
  }

  public function getUiData()
  {
    return $this->jsonSerialize();
  }
}