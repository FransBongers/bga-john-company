<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfMaratha extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_MARATHA;
    $this->title = clienttranslate('Governor of Maratha');
    $this->hirePriority = 14;
  }

}
