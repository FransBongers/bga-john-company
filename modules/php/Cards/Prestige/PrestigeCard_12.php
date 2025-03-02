<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_12 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_12';
    $this->title = clienttranslate('Esther Summerson');
    $this->type = SPOUSE;
  }
}
