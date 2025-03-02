<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_19 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_19';
    $this->title = clienttranslate('Lord Highgate');
    $this->type = SPOUSE;
  }
}
