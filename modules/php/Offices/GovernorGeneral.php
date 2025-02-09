<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorGeneral extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_GENERAL;
    $this->title = clienttranslate('Governor General');
    $this->hirePriority = 2;
  }

}
