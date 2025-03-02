<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_20 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_20';
    $this->title = clienttranslate('Lady Newcome');
    $this->type = SPOUSE;
  }
}
