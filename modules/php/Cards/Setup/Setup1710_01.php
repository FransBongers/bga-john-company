<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_01 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_01';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => OFFICE,
        'value' => CHAIRMAN,
      ],
      [
        'type' => COMPANY_SHARE,
      ],
      [
        'type' => CASH,
        'value' => 1,
      ],
    ];
  }

}
