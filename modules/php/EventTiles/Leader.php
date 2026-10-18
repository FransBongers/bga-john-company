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
      $this->insertResolveCrisisNode($ctx, REBELLION, $regionId, $region->getControl(), $this->strength);
      return;
    }

    // Else region was company controlled. We resolve rebellion against the company
    $this->insertResolveCrisisNode($ctx, REBELLION_AGAINST_COMPANY, $regionId, null, $this->strength);
  }

  private function insertResolveCrisisNode($ctx, string $type, string $attackerId, string | null $defenderId, int $eventTileStrength)
  {
    $ctx->insertAsBrother(new LeafNode([
      'action' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
      'args' => [
        'type' => $type,
        'attackerId' => $attackerId,
        'defenderId' => $defenderId,
        'eventTileStrength' => $eventTileStrength,
        'primaryCrisis' => true,
      ]
    ]));
  }
}
