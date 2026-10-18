<?php

namespace Bga\Games\JohnCompany\Models;

class ControlToken extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'control_tokens';
  protected $primary = 'control_token_id';
  protected $location;
  protected $state;
  protected $looted;

  protected $attributes = [
    'id' => ['control_token_id', 'str'],
    'location' => 'control_token_location',
    'state' => ['control_token_state', 'int'],
    'looted' => ['looted', 'int'],
  ];

  protected $staticAttributes = [];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['looted'] = $this->looted === 1;
    return $data;
  }

  public function getUiData()
  {
    return $this->jsonSerialize();
  }

  public function isLooted(): bool
  {
    return $this->looted === 1;
  }
}