<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_26 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_26';
    $this->title = clienttranslate('SOCIAL MAGAZINE');
    $this->type = ENTERPRISE;
  }
}
