<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_14 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_14';
    $this->scenarioSetup = 1710;
    $this->extra = true;
    $this->items = [
      [
        'type' => SHIPYARD,
        'value' => UNFITTED
      ],
      [
        'type' => SHIPYARD,
        'value' => UNFITTED
      ],
    ];
  }

}
