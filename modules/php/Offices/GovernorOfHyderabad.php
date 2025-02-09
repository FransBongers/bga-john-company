<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfHyderabad extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_HYDERABAD;
    $this->title = clienttranslate('Governor of Hyderabad');
    $this->hirePriority = 15;
  }

}
