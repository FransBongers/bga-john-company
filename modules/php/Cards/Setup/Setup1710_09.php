<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_09 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_09';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => COMMANDER,
        'value' => MADRAS,
      ],
      [
        'type' => WRITER,
        'value' => MADRAS
      ],
      [
        'type' => CASH,
        'value' => 3,
      ],
    ];
  }

}
