<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;

class Crisis extends \Bga\Games\JohnCompany\Models\EventTile
{
  protected $strength;
  protected $shape;

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Crisis');
    $this->type = CRISIS;
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);

    $elephantLocation = Elephant::getLocation();

    $regions = Regions::getAll();

    if (!Elephant::isOnBorder()) {
      // Elephant is in Region. Rebellion against the Company
      ResolveCrisis::resolveRebellionAgainstTheCompany($regions, $elephantLocation, $this->strength);
      // TODO: elephant march
      return;
    }

    $regionIds = BORDERS_CONNECTED_REGIONS_MAP[$elephantLocation];
    $defenderId = Elephant::getFacing();
    $attackerId = Utils::array_find($regionIds, function ($regionId) use ($defenderId) {
      return $regionId !== $defenderId;
    });
    if ($regions[$attackerId]->isDominatedByRegion()) {
      ResolveCrisis::resolveRebellion($regions, $attackerId, $defenderId, $this->strength);
      Elephant::march($this->shape);
    } else if ($regions[$defenderId]->isCompanyControlled()) {
      ResolveCrisis::resolveInvasionAgainstTheCompany($regions, $attackerId, $defenderId, $this->strength);
      // TODO: elephant march
    } else {
      $successfulInvasion = ResolveCrisis::resolveInvasion($regions, $attackerId, $defenderId, $this->strength);
      Elephant::march($this->shape, $successfulInvasion ? $attackerId : null);
    }
  }
}
