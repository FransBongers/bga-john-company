<?php

namespace Bga\Games\JohnCompany\Models;

class CompanyFailureCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'company_failure_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;

  protected $title;
  protected $text = [];

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => ['card_location', 'str'],
    'state' => ['card_state', 'int'],
  ];

  protected $staticAttributes = [
    'title',
    'text'
  ];


}