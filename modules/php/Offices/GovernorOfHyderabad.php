<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfHyderabad extends \Bga\Games\JohnCompany\Offices\Governor
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_HYDERABAD;
    $this->title = clienttranslate('Governor of Hyderabad');
    $this->hirePriority = 15;
    $this->regionId = HYDERABAD;
    $this->dicePool = 3;
  }

}
