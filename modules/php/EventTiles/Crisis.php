<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
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

  public function resolveEvent(string $regionId, $ctx)
  {
    // parent::resolveEvent($regionId, $ctx);

    $elephantLocation = Elephant::getLocation();

    $regions = Regions::getAll();

    $type = null;

    if (!Elephant::isOnBorder()) {
      // Elephant is in Region. Rebellion against the Company
      $this->insertResolveCrisisNodes($ctx, REBELLION_AGAINST_COMPANY, [
        [
          'attackerId' => $elephantLocation,
          'defenderId' => null,
          'strengthModifier' => $this->strength
        ]
      ]);
      return;
    }

    $regionIds = BORDERS_CONNECTED_REGIONS_MAP[$elephantLocation];
    $defenderId = Elephant::getFacing();
    $attackerId = Utils::array_find($regionIds, function ($regionId) use ($defenderId) {
      return $regionId !== $defenderId;
    });
    $type = null;
    if ($regions[$attackerId]->isDominatedByRegion()) {
      $type = REBELLION;
    } else if ($regions[$defenderId]->isCompanyControlled()) {
      $type = INVASION_AGAINST_COMPANY;
    } else {
      $type = INVASION;
    }
    $this->insertResolveCrisisNodes($ctx, $type, [
      [
        'attackerId' => $attackerId,
        'defenderId' => $defenderId,
        'strengthModifier' => $this->strength
      ]
    ]);
  }

  public function getNotificationText()
  {
    return '${tkn_boldText_eventTitle}';
  }
}
