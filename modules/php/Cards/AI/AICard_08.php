<?php

namespace Bga\Games\JohnCompany\Cards\AI;

class AICard_08 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_08';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [BENGAL_PRESIDENCY, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY];
    // Front
    $this->cardPriority = [1, 2, 0];
    $this->directionPriority = [1, 0];
    $this->presidencyPriority = [2, 1, 0];
    $this->regionPriority = [BENGAL, MADRAS, MYSORE, BOMBAY, HYDERABAD, PUNJAB, MARATHA, DELHI];
  }

  // TODO: implement
  public function getClimate(): string
  {
    return LION;
  }
}
