<?php

namespace Bga\Games\JohnCompany\Cards\AI;

class AICard_09 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_09';
    // Back
    $this->directionOrder = [COUNTER_CLOCKWISE, CLOCKWISE];
    $this->presidencyOrder = [BENGAL_PRESIDENCY, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY];
    // Front
    $this->cardPriority = [2, 0, 1];
    $this->directionPriority = [1, 0];
    $this->presidencyPriority = [2, 0, 1];
    $this->regionPriority = [DELHI, BENGAL, BOMBAY, MADRAS, MYSORE, PUNJAB, HYDERABAD, MARATHA];
  }

  // TODO: implement
  public function getClimate(): string
  {
    return PEACOCK;
  }
}
