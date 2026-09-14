<?php

namespace Bga\Games\JohnCompany\Models;

class LawCard extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'law_cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;

  protected $background;
  protected $header = 'default';
  protected $title;
  protected $text = [];
  protected $extraActionText = null;
  protected $extraAction = null;
  protected $initialSupport = null;
  protected $policyTarget = null;
  protected $policyConsequence = null;
  // protected $type;

  protected $attributes = [
    'id' => ['card_id', 'str'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
  ];

  protected $staticAttributes = [
    'background',
    'header',
    'title',
    'text',
    'extraActionText',
    'extraAction',
    'initialSupport',
    'policyTarget',
    'policyConsequence',
    // 'type',
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
