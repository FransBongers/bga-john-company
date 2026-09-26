<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;

class PresidentOfMadras extends \Bga\Games\JohnCompany\Offices\President
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_MADRAS;
    $this->title = clienttranslate('President of Madras');
    $this->hirePriority = 6;
    $this->presidencyId = MADRAS_PRESIDENCY;
    $this->regionId = MADRAS;
    $this->seaZone = SOUTH_INDIAN;
    $this->homePortOrderId = ORDER_MADRAS_1;
  }
}
