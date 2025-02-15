<?php

namespace Bga\Games\JohnCompany\Cards\Setup;

class Setup1710_06 extends \Bga\Games\JohnCompany\Models\SetupCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'Setup1710_06';
    $this->scenarioSetup = 1710;
    $this->items = [
      [
        'type' => PRIME_MINISTER,
      ],
      [
        'type' => RANDOM_BLACKMAIL_CARD,
      ],
    ];
  }

}
