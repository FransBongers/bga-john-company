<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\Regions;

class EventTile extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;
  protected $table = 'event_tiles';
  protected $primary = 'event_tile_id';
  protected $location;
  protected $state;

  protected $title;
  protected $type;
  protected $regionId; // Back of tile
  protected $shape = null; // Front of tile
  protected $background; // Front of tile

  protected $attributes = [
    'id' => ['event_tile_id', 'str'],
    'location' => 'event_tile_location',
    'state' => ['event_tile_state', 'int'],
  ];

  protected $staticAttributes = [
    'regionId',
    'title',
    'type',
    'shape',
    'background',
  ];
  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function resolveEvent(string $regionId, $ctx) {}

  public function getNotificationText()
  {
    return clienttranslate('${tkn_boldText_eventTitle} in ${tkn_boldText_region}');
  }

  public function draw()
  {
    $this->state = EventTiles::insertOnTop($this->getId(), DISCARD);
    $this->location = DISCARD;

    Notifications::drawEventTile($this);
  }

  // protected function insertResolveCrisisNodes($ctx, string $type, string | null $attackerId, array | null $defenderIds, int $eventTileStrength)
  /**
   * $data is an array of objects (primary crisis) with the keys $attackerId, $defenderId (string | null) and 
   * $strengthModifier (event tyle strength or dice roll for Foreign Invasion)
   */
  protected function insertResolveCrisisNodes($ctx, string $type, array $primaryCrisis)
  {
    $node = [
      'children' => [],
      'crisisType' => $type,
    ];

    $excludedRegionIds = [];
    $regions = Regions::getAll();
    $foreignInvastionAgainstCompany = false;

    foreach ($primaryCrisis as $crisis) {
      if ($type === REBELLION_AGAINST_COMPANY) {
        $excludedRegionIds[] = $crisis['attackerId'];
      } else if ($type === INVASION_AGAINST_COMPANY) {
        $excludedRegionIds[] = $crisis['defenderId'];
      } else if ($type === FOREIGN_INVASION && $regions[$crisis['defenderId']]->isCompanyControlled()) {
        $foreignInvastionAgainstCompany = true;
      }

      $node['children'][] = [
        'action' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
        'args' => [
          'type' => $type === FOREIGN_INVASION && $regions[$crisis['defenderId']]->isCompanyControlled() ? FOREIGN_INVASION_AGAINST_COMPANY : $type,
          'attackerId' => $crisis['attackerId'] ?? null,
          'defenderId' => $crisis['defenderId'] ?? null,
          'strengthModifier' => $crisis['strengthModifier'] ?? 0,
          'primaryCrisis' => true,
        ]
      ];
    }

    if (in_array($type, [REBELLION_AGAINST_COMPANY, INVASION_AGAINST_COMPANY]) || $foreignInvastionAgainstCompany) {
      $node['children'][] = [
        'action' => EVENTS_IN_INDIA_SETUP_SECONDARY_REBELLION,
        'args' => [
          'excludedRegionIds' => $excludedRegionIds,
        ]
      ];
    }

    $isForeignInvasion = $type === FOREIGN_INVASION;

    $node['children'][] = [
      'action' => EVENTS_IN_INDIA_ELEPHANT_MARCH,
      'args' => [
        'type' => $type,
        'elephantRedirect' => $isForeignInvasion && Elephant::isFullyWithinCompanyControlledRegion(),
      ]
    ];

    if (in_array($type, [FOREIGN_INVASION, FOREIGN_INVASION_AGAINST_COMPANY])) {
      $node['children'][] = [
        'action' => CLEAR_CASCADE,
      ];
    }


    $ctx->insertBefore(Engine::buildTree($node));
    // $ctx->insertAsBrother(Engine::buildTree($node));

    // $ctx->insertAsBrother(new LeafNode([
    //   'action' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
    //   'args' => [
    //     'type' => $type,
    //     'attackerId' => $attackerId,
    //     'defenderId' => $defenderId,
    //     'eventTileStrength' => $eventTileStrength,
    //     'primaryCrisis' => true,
    //   ]
    // ]));
  }
}
