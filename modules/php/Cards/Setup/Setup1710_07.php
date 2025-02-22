<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_07 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_07';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => SHIPYARD,
        'value' => WEST_INDIAN,
      ],
      [
        'type' => CASH,
        'value' => 4,
      ],
    ];
  }

}
