<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_16 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_16';
    $this->scenarioSetup = 1710;
    $this->extra = true;
    $this->items = [
      [
        'type' => COMPANY_SHARE,
      ],
      [
        'type' => CASH,
        'value' => 3
      ],
    ];
  }

}
