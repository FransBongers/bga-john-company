<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfPunjab extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_PUNJAB;
    $this->title = clienttranslate('Governor of Punjab');
    $this->hirePriority = 12;
  }

}
