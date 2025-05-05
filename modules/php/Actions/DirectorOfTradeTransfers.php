<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Ships;

class DirectorOfTradeTransfers extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_DIRECTOR_OF_TRADE_TRANSFERS;
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

  public function stDirectorOfTradeTransfers()
  {
    // OfficeHolder needs to be in office
    if (Offices::get(DIRECTOR_OF_TRADE)->getFamilyMemberId() === null) {
      $this->resolveAction(['automatic' => true]);
    }
  }



  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsDirectorOfTradeTransfers()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];

    $options = [
      'ships' => [],
      'writers' => [],
    ];
    // proposed transfers
    $transfers = isset($info['transfers']) ? $info['transfers'] : null;


    $shipsInSeaZones = Utils::filter(Ships::getAll()->toArray(), function ($ship) {
      return in_array($ship->getLocation(), SEA_ZONES);
    });
    /**
     * For each ship, options are the other two sea zones
     * TODO: trade with CHina when in play
     */
    foreach ($shipsInSeaZones as $ship) {
      $options['ships'][$ship->getId()] = [
        'ship' => $ship,
        'locations' => Utils::filter(SEA_ZONES, function ($location) use ($ship) {
          return $location !== $ship->getLocation();
        }),
      ];
    }

    // Generate all writer locations. Same Ids are used for select boxes in UI
    $writerLocations = array_map(function ($regionId) {
      return Locations::writers($regionId);
    }, HOME_REGIONS);
    $writers = FamilyMembers::getWriters();

    /**
     * For each writer, options are the other two regions
     */
    foreach ($writers as $writer) {
      $options['writers'][$writer->getId()] = [
        'familyMember' => $writer,
        'locations' => Utils::filter($writerLocations, function ($location) use ($writer) {
          return $location !== $writer->getLocation();
        })
      ];
    }

    $data = [
      'activePlayerIds' => [$playerId],
      'options' => $options,
      'transfers' => $transfers,
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassDirectorOfTradeTransfers()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actDirectorOfTradeTransfers($args)
  {
    self::checkAction('actDirectorOfTradeTransfers');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsDirectorOfTradeTransfers();

    $shipTransfers = $args->transfers->ships;
    $writerTransfers = $args->transfers->writers;

    $player = Players::get($playerId);

    foreach ($shipTransfers as $shipId => $data) {
      $to = $data->to;
      if (!(isset($stateArgs['options']['ships'][$shipId]) && in_array($to, $stateArgs['options']['ships'][$shipId]['locations']))) {
        throw new \feException("ERROR_012");
      }
      $ship = $stateArgs['options']['ships'][$shipId]['ship'];
      $ship->moveTo($player, $to);
    }

    foreach ($writerTransfers as $writerId => $data) {
      $to = $data->to;
      if (!(isset($stateArgs['options']['writers'][$writerId]) && in_array($to, $stateArgs['options']['writers'][$writerId]['locations']))) {
        throw new \feException("ERROR_013");
      }
      $familyMember = $stateArgs['options']['writers'][$writerId]['familyMember'];
      // $familyMember->setLocation($to);
      $familyMember->moveTo($player, $to);
    }

    if (Crown::isInGame()) {
      $this->checkIfPlayerGainsPromiseCubeFromCrown($player);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkIfPlayerGainsPromiseCubeFromCrown($player)
  {
    $climate = Crown::getClimate();
    if ($climate === BEAR || $climate === PEACOCK) {
      return;
    }
    $writers = FamilyMembers::getWriters();
    $writerCountPerRegion = [
      Locations::writers(BENGAL) => 0,
      Locations::writers(BOMBAY) => 0,
      Locations::writers(MADRAS) => 0,
    ];
    foreach($writers as $writer) {
      $writerCountPerRegion[$writer->getLocation()] += 1;
    }
    $values = array_values($writerCountPerRegion);
    usort($values, function ($a, $b) {return $b - $a;});
    Notifications::log('writerValues',$values);
    if ($values[0] - $values[2] >= 2) {
      return;
    }
    $shipsPerRegion = [
      EAST_INDIAN => 0,
      SOUTH_INDIAN => 0,
      WEST_INDIAN => 0,
    ];
    $ships = Ships::getShipsInSeaZones();
    foreach($ships as $ship) {
      $shipsPerRegion[$ship->getLocation()] += 1;
    }
    $shipCounts = array_values($shipsPerRegion);
    usort($shipCounts, function ($a, $b) {return $b - $a;});
    Notifications::log('shipCounts',$shipCounts);
    if ($shipCounts[0] - $shipCounts[2] >= 2) {
      return;
    }
    $player->getFamily()->gainPromiseCubes(1);
  }

}
