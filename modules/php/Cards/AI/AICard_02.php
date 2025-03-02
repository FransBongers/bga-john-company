<?php

namespace Bga\Games\JohnCompany\Cards\AI;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Regions;

class AICard_02 extends \Bga\Games\JohnCompany\Models\AICard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'AICard_02';
    // Back
    $this->directionOrder = [COUNTER_CLOCKWISE. CLOCKWISE];
    $this->presidencyOrder = [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY];
    // Front
    $this->cardPriority = [1, 2, 0];
    $this->directionPriority = [0, 1];
    $this->presidencyPriority = [0, 1, 2];
    $this->regionPriority = [MYSORE, BOMBAY, PUNJAB, BENGAL, DELHI, MARATHA, HYDERABAD, MADRAS];
  }

  public function getClimate(): string
  {
    $regions = Regions::getAll()->toArray();
    $presidenciedWithControlOfARegion = count(Utils::filter(PRESIDENCIES, function ($presidency) use ($regions) {
      return Utils::array_some($regions, function ($region) use ($presidency) {
        return $region->getControl() === $presidency;
      });
    }));
    if ($presidenciedWithControlOfARegion === 3) {
      return BULL;
    }
    if ($presidenciedWithControlOfARegion === 2) {
      return BEAR;
    }
    return PEACOCK;
  }
}
