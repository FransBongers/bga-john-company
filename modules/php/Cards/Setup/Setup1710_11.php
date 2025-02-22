<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_11 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_11';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => OFFICE,
        'value' => DIRECTOR_OF_TRADE,
      ],
      [
        'type' => SHIPYARD,
        'value' => SOUTH_INDIAN
      ],
      [
        'type' => CASH,
        'value' => 1,
      ],
    ];
  }

}
