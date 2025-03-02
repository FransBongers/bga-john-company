<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Managers\Families;

class AICard_07 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_07';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [MADRAS_PRESIDENCY, BENGAL_PRESIDENCY, BOMBAY];
    // Front
    $this->cardPriority = [0, 1, 2];
    $this->directionPriority = [1, 0];
    $this->presidencyPriority = [1, 0, 2];
    $this->regionPriority = [MARATHA, BENGAL, MADRAS, MYSORE, BOMBAY, DELHI, PUNJAB, HYDERABAD];
  }

  public function getClimate(): string
  {
    $crownTreasury = Families::get(CROWN)->getTreasury();
    if ($crownTreasury <= 7) {
      return BEAR;
    }
    if ($crownTreasury <= 16) {
      return PEACOCK;
    }
    return STAG;
  }
}
