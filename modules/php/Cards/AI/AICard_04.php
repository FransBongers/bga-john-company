<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Managers\Company;

class AICard_04 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_04';
    // Back
    $this->directionOrder = [COUNTER_CLOCKWISE, CLOCKWISE];
    $this->presidencyOrder = [BOMBAY_PRESIDENCY, BENGAL_PRESIDENCY, MADRAS_PRESIDENCY];
    // Front
    $this->cardPriority = [0, 1, 2];
    $this->directionPriority = [0, 1];
    $this->presidencyPriority = [2,  1, 0];
    $this->regionPriority = [PUNJAB, MARATHA, DELHI, HYDERABAD, BENGAL, MADRAS, MYSORE, BOMBAY];
  }

  public function getClimate(): string
  {
    $expectations = Company::getStanding();
    if ($expectations <= 6) {
      return BEAR;
    }
    if ($expectations === 8) {
      return STAG;
    }
    return BULL;
  }
}
