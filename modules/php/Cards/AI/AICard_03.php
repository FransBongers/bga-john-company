<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Managers\Company;

class AICard_03 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_03';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY];
    // Front
    $this->cardPriority = [2, 0, 1];
    $this->directionPriority = [0, 1];
    $this->presidencyPriority = [0, 2, 1];
    $this->regionPriority = [BOMBAY, PUNJAB, DELHI, HYDERABAD, MARATHA, BENGAL, MADRAS, MYSORE];
  }

  public function getClimate(): string
  {
    $debt = Company::getDebt();
    if ($debt === 0) {
      return STAG;
    }
    if ($debt <= 4) {
      return BULL;
    }
    return PEACOCK;
  }
}
