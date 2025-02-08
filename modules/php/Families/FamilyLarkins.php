<?php

namespace Bga\Games\JohnCompany\Families;

class FamilyLarkins extends \Bga\Games\JohnCompany\Models\Family
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = LARKINS;
  }

}
