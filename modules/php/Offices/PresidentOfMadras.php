<?php

namespace Bga\Games\JohnCompany\Offices;

class PresidentOfMadras extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = PRESIDENT_OF_MADRAS;
    $this->title = clienttranslate('President of Madras');
    $this->hirePriority = 6;
  }

}
