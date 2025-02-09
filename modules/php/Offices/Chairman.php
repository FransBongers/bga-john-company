<?php

namespace Bga\Games\JohnCompany\Offices;

class Chairman extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = CHAIRMAN;
    $this->title = clienttranslate('Chairman');
    $this->hirePriority = 1;
  }

}
