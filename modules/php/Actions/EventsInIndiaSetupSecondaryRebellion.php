<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Player;

class EventsInIndiaSetupSecondaryRebellion extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_EVENTS_IN_INDIA_SETUP_SECONDARY_REBELLION;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stEventsInIndiaSetupSecondaryRebellion()
  {
    $args = $this->ctx->getArgs();
    $excludedRegionIds = $args['excludedRegionIds'] ?? [];

    $this->insertAdditionalRebellionCrisisNodes($excludedRegionIds);

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function insertAdditionalRebellionCrisisNodes(array $excludedRegionIds)
  {
    $regionsByPresidency = [BOMBAY_PRESIDENCY => [], MADRAS_PRESIDENCY => [], BENGAL_PRESIDENCY => []];

    foreach (Regions::getAll() as $region) {
      if (in_array($region->getId(), $excludedRegionIds) || !$region->isCompanyControlled() || $region->getUnrest() <= 0) {
        continue;
      }
      $regionsByPresidency[$region->getControllingPresidencyId()][] = $region;
    }

    $nodes = [];
    foreach ($regionsByPresidency as $regions) {
      if (count($regions) === 0) {
        continue;
      }
      $children = array_map(function ($region) {
        return [
          'action' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
          'args' => [
            'type' => REBELLION_AGAINST_COMPANY,
            'attackerId' => $region->getId(),
            'defenderId' => null,
            'eventTileStrength' => 0,
            'primaryCrisis' => false,
          ],
        ];
      }, $regions);

      $nodes[] = [
        'type' => NODE_OR,
        'playerId' => $regions[0]->getActingCommander()->getPlayerId(),
        'children' => $children,
        'requiredChoiceCount' => count($children),
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('${you} must choose where to resolve a rebellion next'),
          'description' => clienttranslate('${actplayer} must choose where to resolve a rebellion next'),
          'args' => []
        ],
      ];
    }

    if (count($nodes) === 0) {
      return;
    }

    // Single seq node keeps presidency order; repeated insertAsBrother would reverse it
    $this->ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_SEQ,
      'children' => $nodes,
    ]));
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('EventsInIndiaSetupSecondaryRebellion');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
