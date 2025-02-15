<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_13 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_13';
    $this->scenarioSetup = 1710;
    $this->extra = true;
    $this->items = [
      [
        'type' => OFFICER_IN_TRAINING,
      ],
      [
        'type' => OFFICER_IN_TRAINING,
      ],
      [
        'type' => OFFICER_IN_TRAINING,
      ],
      [
        'type' => CASH,
        'value' => 2,
      ],
    ];
  }

}
