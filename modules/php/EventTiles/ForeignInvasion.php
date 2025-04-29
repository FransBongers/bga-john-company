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
  }

  public function resolveEvent($regionId)
  {
    parent::resolveEvent($regionId);
    $side = ONE_ALL;// EventTiles::rollStormDie();

    $sideRegionMap = [
      ONE_ALL => [BOMBAY, MADRAS, BENGAL],
      TWO_EAST => [BENGAL],
      THREE_SOUTH => [MADRAS],
      TWO_WEST => [BOMBAY],
      FOUR => [$regionId]
    ];

    $regionIds = $sideRegionMap[$side];


    $node = [
      'children' => []
    ];

    foreach ($regionIds as $regionId) {
      $node['children'][] = [
        'action' => FOREIGN_INVASION,
        'regionId' => $regionId
      ];
    }

    $node['children'][] = [
      'action' => FOREIGN_INVASION_END,

    ];

    $currentNode = Engine::getNextUnresolved();
    $currentNode->insertAsBrother(Engine::buildTree($node));
    
  }

}
