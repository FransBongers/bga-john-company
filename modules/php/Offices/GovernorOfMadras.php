<?php

namespace Bga\Games\JohnCompany\Offices;

class GovernorOfMadras extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_OF_MADRAS;
    $this->title = clienttranslate('Governor of Madras');
    $this->hirePriority = 10;
  }

}
