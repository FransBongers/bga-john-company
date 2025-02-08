<?php

namespace Bga\Games\JohnCompany\Families;

class FamilyWalsh extends \Bga\Games\JohnCompany\Models\Family
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = WALSH;
  }

}
