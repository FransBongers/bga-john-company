<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_03 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_03';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => OFFICE,
        'value' => PRESIDENT_OF_BENGAL,
      ],
      [
        'type' => COMPANY_SHARE,
      ],
    ];
  }

}
