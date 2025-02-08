<?php

namespace Bga\Games\JohnCompany\Families;

class FamilyHastings extends \Bga\Games\JohnCompany\Models\Family
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = HASTINGS;
  }

}
