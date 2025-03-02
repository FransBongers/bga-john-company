<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class PrestigeCard_13 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_13';
    $this->title = clienttranslate('John Thorpe');
    $this->type = SPOUSE;
  }
}
