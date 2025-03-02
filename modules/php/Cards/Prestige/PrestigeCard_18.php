<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_18 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_18';
    $this->title = clienttranslate('Lady Glencora');
    $this->type = SPOUSE;
  }
}
