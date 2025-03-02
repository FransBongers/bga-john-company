<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Managers\FamilyMembers;

class AICard_06 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_06';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [MADRAS_PRESIDENCY, BENGAL_PRESIDENCY, BOMBAY];
    // Front
    $this->cardPriority = [2, 0, 1];
    $this->directionPriority = [1, 0];
    $this->presidencyPriority = [1, 2, 0];
    $this->regionPriority = [HYDERABAD, DELHI, BENGAL, MADRAS, MYSORE, BOMBAY, MARATHA, PUNJAB];
  }

  public function getClimate(): string
  {
    // TODO: check if Chairman share still counts if position is vacant for some reason?
    $shares = FamilyMembers::countInLocation(COURT_OF_DIRECTORS) + 1;

    if ($shares >= 9) {
      return LION;
    }
    if ($shares >= 7) {
      return BEAR;
    }
    if (Globals::getDeregulation()) {
      return PEACOCK;
    }
    return BULL;
  }
}
