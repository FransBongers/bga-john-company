<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Managers\Company;

class AICard_01 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_01';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY];
    // Front
    $this->cardPriority = [0, 1, 2];
    $this->directionPriority = [0, 1];
    $this->presidencyPriority = [0, 2, 1];
    $this->regionPriority = [MADRAS, MYSORE, BOMBAY, PUNJAB, DELHI, MARATHA, HYDERABAD, BENGAL];
  }

  public function getClimate(): string
  {
    $expectations = Company::getStanding();
    if ($expectations === 4) {
      return PEACOCK;
    }
    if ($expectations === 6) {
      return LION;
    }
    return BULL;
  }
}
