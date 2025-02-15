<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_18 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_18';
    $this->scenarioSetup = 1710;
    $this->extra = true;
    $this->items = [
      [
        'type' => RANDOM_BLACKMAIL_CARD,
      ],
      [
        'type' => CASH,
        'value' => 3
      ],
    ];
  }

}
