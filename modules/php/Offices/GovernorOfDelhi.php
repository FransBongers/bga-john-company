<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfDelhi extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_DELHI;
    $this->title = clienttranslate('Governor of Delhi');
    $this->hirePriority = 13;
  }

}
