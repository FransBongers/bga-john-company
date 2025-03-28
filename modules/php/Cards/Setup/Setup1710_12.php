<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_12 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_12';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => OFFICE,
        'value' => MILITARY_AFFAIRS,
      ],
      [
        'type' => SHIPYARD,
        'value' => EAST_INDIAN
      ],
      [
        'type' => CASH,
        'value' => 1,
      ],
    ];
  }

}
