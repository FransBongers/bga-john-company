<?php

namespace Bga\Games\JohnCompany\Offices;

class MilitaryAffairs extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MILITARY_AFFAIRS;
    $this->title = clienttranslate('Military Affairs');
    $this->hirePriority = 4;
  }

}
