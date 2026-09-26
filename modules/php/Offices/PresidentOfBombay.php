<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;

class PresidentOfBombay extends \Bga\Games\JohnCompany\Offices\President
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_BOMBAY;
    $this->title = clienttranslate('President of Bombay');
    $this->hirePriority = 5;
    $this->presidencyId = BOMBAY_PRESIDENCY;
    $this->regionId = BOMBAY;
    $this->seaZone = WEST_INDIAN;
    $this->homePortOrderId = ORDER_BOMBAY_3;
  }
}
