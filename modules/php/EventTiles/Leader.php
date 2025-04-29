<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;

class Leader extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $strength;
  protected $shape;

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Leader');
    $this->type = LEADER;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);
    $region = Regions::get($regionId);
    if ($region->isSovereign()) {
      $region->incTowerLevel(1);
      return;
    }

    // Dominated by another region. Region will rebel against capital
    if ($region->isDominatedByRegion()) {
      ResolveCrisis::resolveRebellion(Regions::getAll(), $regionId, $region->getControl(), $this->strength);
      return;
    }

    // Else region was company controlled. We resolve rebellion against the company
    $successfulRebellion = ResolveCrisis::resolveRebellionAgainstTheCompany(Regions::getAll(), $regionId, $this->strength);
    // Elephant is fully within Company-controlled region 
    if ($successfulRebellion && Elephant::getLocation() === $regionId) {
      Elephant::march($this->shape);
    }
  }
}
