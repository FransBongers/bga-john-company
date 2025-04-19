<?php

namespace Bga\Games\JohnCompany\Offices;

class SuperintendentOfTradeInChina extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SUPERINTENDENT_OF_TRADE_IN_CHINA;
    $this->title = clienttranslate('Superintendent of Trade in China');
    $this->hirePriority = 8;
  }

}
