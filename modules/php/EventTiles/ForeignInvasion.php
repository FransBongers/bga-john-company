<?php

namespace Bga\Games\JohnCompany\EventTiles;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\Regions;

class ForeignInvasion extends \Bga\Games\JohnCompany\Models\EventTile
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Foreign Invasion');
    $this->type = FOREIGN_INVASION;
    $this->shape = CIRCLE;
  }

  public function resolveEvent($regionId, $ctx)
  {
    $this->resolveForeignInvastion($ctx, $regionId);
  }

  public function resolveForeignInvastion($ctx, string | null $regionId = null, bool $warAgainstFrance = false)
  {
    $side = EventTiles::rollStormDie();

    // $regionId is null in case of WAR AGAINST FRANCE law 
    if ($warAgainstFrance && $side === FOUR) {
      Notifications::message(clienttranslate('No invasion occurs'));
      return;
    }

    $sideRegionMap = [
      ONE_ALL => [BOMBAY, MADRAS, BENGAL],
      TWO_EAST => [BENGAL],
      THREE_SOUTH => [MADRAS],
      TWO_WEST => [BOMBAY],
      FOUR => [$regionId]
    ];

    $regionIds = $sideRegionMap[$side];

    $this->insertResolveCrisisNodes($ctx, FOREIGN_INVASION, array_map(function ($regionId) {
      return [
        'attackerId' => null,
        'defenderId' => $regionId,
        'strengthModifier' => 0,
      ];
    }, $regionIds));
  }

  public function getNotificationText()
  {
    return '${tkn_boldText_eventTitle}';
  }
}
