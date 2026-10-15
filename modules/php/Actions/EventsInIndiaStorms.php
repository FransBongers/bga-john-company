<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Ships;

use Bga\Games\JohnCompany\Models\SetupCard;

class EventsInIndiaStorms extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected array $stormDieEventCountMap = [
    ONE_ALL => 1,
    TWO_EAST => 2,
    TWO_WEST => 2,
    THREE_SOUTH => 3,
    FOUR => 4,
  ];

  protected array $stormDieSeaZoneMap = [
    ONE_ALL => [WEST_INDIAN, SOUTH_INDIAN, EAST_INDIAN],
    TWO_EAST => [EAST_INDIAN],
    TWO_WEST => [WEST_INDIAN],
    THREE_SOUTH => [SOUTH_INDIAN],
    FOUR => [],
  ];

  public function getState()
  {
    return ST_EVENTS_IN_INDIA_STORMS;
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


  public function stEventsInIndiaStorms()
  {
    /**
     * 1. Roll storm die
     * 2. Resolve storm
     * 3. Set Global with number of events to handle
     */
    $side = EventTiles::rollStormDie();

    $numberOfEvents = $this->stormDieEventCountMap[$side];

    Globals::setEventsToResolve($numberOfEvents);
    $this->rollForShips($side);

    $this->resolveAction(['automatic' => true]);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function rollForShips(string $side)
  {
    $seaZones = $this->stormDieSeaZoneMap[$side];
    $playerOrder = Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId());
    $players = Players::getAll();

    foreach ($seaZones as $seaZone) {
      $ships = Ships::getInLocationOrdered($seaZone)->toArray();
      foreach ($playerOrder as $playerId) {
        $playerShips = array_filter($ships, fn($ship) => $ship->getOwnerPlayerId() == $playerId && !$ship->isOtherShip());
        foreach ($playerShips as $ship) {
          $ship->resolveStorm($players[$playerId]);
        }
      }
    }
  }
}
