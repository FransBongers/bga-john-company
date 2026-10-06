<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfBombay extends \Bga\Games\JohnCompany\Offices\Governor
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_BOMBAY;
    $this->title = clienttranslate('Governor of Bombay');
    $this->hirePriority = 9;
    $this->regionId = BOMBAY;
  }

}
