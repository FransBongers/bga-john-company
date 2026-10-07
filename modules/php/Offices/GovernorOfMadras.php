<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfMadras extends \Bga\Games\JohnCompany\Offices\Governor
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_MADRAS;
    $this->title = clienttranslate('Governor of Madras');
    $this->hirePriority = 10;
    $this->regionId = MADRAS;
    $this->dicePool = 4;
  }

}
