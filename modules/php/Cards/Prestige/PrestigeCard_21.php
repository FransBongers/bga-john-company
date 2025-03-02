<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_21 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_21';
    $this->title = clienttranslate('SHIPBUILDERS');
    $this->type = ENTERPRISE;
  }
}
