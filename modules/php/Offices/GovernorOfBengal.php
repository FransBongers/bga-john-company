<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfBengal extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_BENGAL;
    $this->title = clienttranslate('Governor of Bengal');
    $this->hirePriority = 11;
  }

}
