<?php

namespace Bga\Games\JohnCompany\Families;

class FamilyBenyon extends \Bga\Games\JohnCompany\Models\Family
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = BENYON;
  }

}
