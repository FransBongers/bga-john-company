<?php

namespace Bga\Games\JohnCompany\Offices;

class DirectorOfTrade extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = DIRECTOR_OF_TRADE;
    $this->title = clienttranslate('Director of Trade');
    $this->hirePriority = 2;
  }

}
