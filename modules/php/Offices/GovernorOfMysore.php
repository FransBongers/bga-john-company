<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfMysore extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_MYSORE;
    $this->title = clienttranslate('Governor of Mysore');
    $this->hirePriority = 16;
  }

}
