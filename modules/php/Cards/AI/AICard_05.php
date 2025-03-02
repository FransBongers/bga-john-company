<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Ships;

class AICard_05 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_05';
    // Back
    $this->directionOrder = [CLOCKWISE, COUNTER_CLOCKWISE];
    $this->presidencyOrder = [MADRAS_PRESIDENCY, BENGAL_PRESIDENCY, BOMBAY];
    // Front
    $this->cardPriority = [1, 2, 0];
    $this->directionPriority = [0, 1];
    $this->presidencyPriority = [1, 0, 2];
    $this->regionPriority = [PUNJAB, HYDERABAD, MARATHA, BENGAL, MADRAS, MYSORE, BOMBAY, DELHI];
  }

  public function getClimate(): string
  {
    $ships = Ships::getAll()->toArray();

    $counts = [
      WEST_INDIAN => 0,
      EAST_INDIAN => 0,
      SOUTH_INDIAN => 0,
    ];
    $seas = [WEST_INDIAN, EAST_INDIAN, SOUTH_INDIAN];

    foreach ($ships as $ship) {
      $location = $ship->getLocation();
      if (in_array($location, $seas)) {
        $counts[$location]++;
      }
    }
    $seasWithAtLeastTwoShips = count(Utils::filter($seas, function ($sea) use ($counts) {
      return $counts[$sea] >= 2;
    }));
    if ($seasWithAtLeastTwoShips === 3) {
      return BULL;
    }
    if ($seasWithAtLeastTwoShips === 2) {
      return STAG;
    }
    return LION;
  }
}
