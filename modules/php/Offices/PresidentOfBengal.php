<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;

class PresidentOfBengal extends \Bga\Games\JohnCompany\Offices\President
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_BENGAL;
    $this->title = clienttranslate('President of Bengal');
    $this->hirePriority = 7;
    $this->presidencyId = BENGAL_PRESIDENCY;
    $this->regionId = BENGAL;
    $this->seaZone = EAST_INDIAN;
    $this->homePortOrderId = ORDER_BENGAL_2;
  }
}
