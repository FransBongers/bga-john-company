<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
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

  public function resolveEvent(string $regionId, $ctx)
  {
    parent::resolveEvent($regionId, $ctx);
    $region = Regions::get($regionId);
    if ($region->isSovereign()) {
      $region->incTowerLevel(1);
      return;
    }

    // Dominated by another region. Region will rebel against capital
    if ($region->isDominatedByRegion()) {
      $this->insertResolveCrisisNodes($ctx, REBELLION, [
        [
          'attackerId' => $regionId,
          'defenderId' => $region->getControl(),
          'strengthModifier' => $this->strength
        ]
      ]);
      return;
    }

    // Else region was company controlled. We resolve rebellion against the company
    $this->insertResolveCrisisNodes($ctx, REBELLION_AGAINST_COMPANY, [
      [
        'attackerId' => $regionId,
        'defenderId' => null,
        'strengthModifier' => $this->strength
      ]
    ]);
  }
}
