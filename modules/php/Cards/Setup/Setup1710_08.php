<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_08 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_08';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => COMMANDER,
        'value' => BOMBAY,
      ],
      [
        'type' => WRITER,
        'value' => BOMBAY
      ],
      [
        'type' => CASH,
        'value' => 4,
      ],
    ];
  }

}
