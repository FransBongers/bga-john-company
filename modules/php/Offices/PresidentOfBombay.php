<?php

namespace Bga\Games\JohnCompany\Offices;

class PresidentOfBombay extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_BOMBAY;
    $this->title = clienttranslate('President of Bombay');
    $this->hirePriority = 5;
  }

}
