<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfDelhi extends \Bga\Games\JohnCompany\Offices\Governor
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_DELHI;
    $this->title = clienttranslate('Governor of Delhi');
    $this->hirePriority = 13;
    $this->regionId = DELHI;
    $this->dicePool = 4;
  }

}
