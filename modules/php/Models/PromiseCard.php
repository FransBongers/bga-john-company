<?php

namespace Bga\Games\JohnCompany\Models;

class PromiseCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'promise_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;
  protected $type;
  protected $familyId;

  protected $title;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => ['card_location', 'str'],
    'state' => ['card_state', 'int'],
    'type' => ['type', 'str'],
    'familyId' => ['family_id', 'str']
  ];

  protected $staticAttributes = [
    'title'
  ];
}
