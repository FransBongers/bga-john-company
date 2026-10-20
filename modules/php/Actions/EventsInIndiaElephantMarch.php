<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Models\Player;

class EventsInIndiaElephantMarch extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_EVENTS_IN_INDIA_ELEPHANT_MARCH;
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

  public function stEventsInIndiaElephantMarch()
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];

    $nodeType = null;

    switch ($type) {
      case REBELLION:
      case INVASION:
        $this->elephantMarch(EVENTS_IN_INDIA_RESOLVE_CRISIS);
        break;
      case REBELLION_AGAINST_COMPANY:
      case INVASION_AGAINST_COMPANY:
        $this->elephantMarch(EVENTS_IN_INDIA_CRISIS_DEFENSE);
        break;
      case FOREIGN_INVASION:
      case FOREIGN_INVASION_AGAINST_COMPANY:
        $this->elephantRedirect($args['elephantRedirect'] ?? false);
        break;
      default:
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_073");
    }

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function elephantRedirect(bool $elephantRedirect)
  {
    if (!$elephantRedirect) {
      return;
    }
    Elephant::march();
  }

  private function elephantMarch(string $nodeType)
  {
    $resolvedActions = $this->ctx->getParent()->getResolvedActions([$nodeType]);

    $capitalRegionId = null;

    foreach ($resolvedActions as $action) {
      $resolutionArgs = $action->getActionResolutionArgs();
      $capitalRegionId = $resolutionArgs['capitalRegionId'] ?? null;
      $primaryCrisis = $resolutionArgs['primaryCrisis'] ?? false;
      // TODO: check Foreign Invasion?
      if ($primaryCrisis && $capitalRegionId !== null) {
        $capitalRegionId = $capitalRegionId;
        break;
      }
    }

    Elephant::march($capitalRegionId);
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
    return clienttranslate('EventsInIndiaElephantMarch');
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
