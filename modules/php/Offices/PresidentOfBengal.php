<?php

namespace Bga\Games\JohnCompany\Offices;

class PresidentOfBengal extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_BENGAL;
    $this->title = clienttranslate('President of Bengal');
    $this->hirePriority = 7;
  }

}
