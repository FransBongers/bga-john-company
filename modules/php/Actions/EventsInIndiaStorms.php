<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Ships;

use Bga\Games\JohnCompany\Models\SetupCard;

class EventsInIndiaStorms extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected $stormDieEventCountMap = [
    ONE_ALL => 1,
    TWO_EAST => 2,
    TWO_WEST => 2,
    THREE_SOUTH => 3,
    FOUR => 4,
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
    $players = Players::getAll()->toArray();
    // 1. Roll storm die
    $playerToRollTheStormDie = $players[bga_rand(0, count($players) - 1)];

    $side = STORM_DIE[bga_rand(0, 5)];
    Notifications::message(clienttranslate('${player_name} rolls ${tkn_stormDie} with the storm die'), [
      'player' => $playerToRollTheStormDie,
      'tkn_stormDie' => $side
    ]);

    $numberOfEvents = $this->stormDieEventCountMap[$side];

    Globals::setEventsToResolve($numberOfEvents);

    $this->resolveAction(['automatic' => true]);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
