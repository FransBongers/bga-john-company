<?php

namespace Bga\Games\JohnCompany\Cards\AI;

class AICard_10 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_10';
    // Back
    $this->directionOrder = [COUNTER_CLOCKWISE, CLOCKWISE];
    $this->presidencyOrder = [BENGAL_PRESIDENCY, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY];
    // Front
    $this->cardPriority = [1, 2, 0];
    $this->directionPriority = [1, 0];
    $this->presidencyPriority = [2, 1, 0];
    $this->regionPriority = [HYDERABAD, BOMBAY, PUNJAB, MYSORE, MARATHA, DELHI, BENGAL, MADRAS];
  }

  // TODO: implement
  public function getClimate(): string
  {
    return BEAR;
  }
}
