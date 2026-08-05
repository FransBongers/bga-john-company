<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\SetupCard;

class CrownManagerOfShippingFitShips extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_MANAGER_OF_SHIPPING_FIT_SHIPS;
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


  public function stCrownManagerOfShippingFitShips()
  {
    // $climate = Crown::getClimate();
    // $shipData = $this->getShipToFit();

    // if ($shipData === null) {
    //   $this->resolveAction(['automatic' => true]);
    //   return;
    // }

    // $shipLocation = WEST_INDIAN;

    // $action = [
    //   'action' => CROWN_MANAGER_OF_SHIPPING_UNFITTED_SHIP_OPTIONS,
    //   'playerId' => 'some',
    //   'activePlayerIds' => Players::getNonCrownPlayerIds(),
    //   'shipId' => $shipData['ship']->getId(),
    //   'phase' => $shipData['phase'],
    //   'location' => $shipLocation,
    // ];
    // $this->ctx->insertAsBrother(Engine::buildTree($action));

    // $this->resolveAction(['automatic' => true]);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.


  public function argsCrownManagerOfShippingFitShips()
  {
    // $climate = Crown::getClimate();
    $availableShips = $this->getAvailableShips();

    $office = Offices::get(MANAGER_OF_SHIPPING);
    $treasury = $office->getTreasury();

    // $availableShips[]

    $shipsThatWillBeFitted = [];
    $shipsThatWillNotBeFitted = [];
    $playerPromiseCubeCost = [];

    foreach ($availableShips['crown'] as $ship) {
      if ($treasury >= COST_TO_FIT_SHIP) {
        $shipsThatWillBeFitted[] = $ship;
        $treasury -= COST_TO_FIT_SHIP;
      } else {
        $shipsThatWillNotBeFitted[] = $ship;
      }
    }

    foreach ($availableShips['players'] as $ship) {
      if ($treasury >= COST_TO_FIT_SHIP) {
        $shipsThatWillBeFitted[] = $ship;
        $treasury -= COST_TO_FIT_SHIP;
        $playerId = $ship->getOwnerPlayerId();
        if (isset($playerPromiseCubeCost[$playerId])) {
          $playerPromiseCubeCost[$playerId] += 1;
        } else {
          $playerPromiseCubeCost[$playerId] = 1;
        }
      } else {
        $shipsThatWillNotBeFitted[] = $ship;
      }
    }

    return [
      'shipsThatWillBeFitted' => $shipsThatWillBeFitted,
      'shipsThatWillNotBeFitted' => $shipsThatWillNotBeFitted,
      'playerPromiseCubeCost' => $playerPromiseCubeCost,
      // 'ships' => $this->getAvailableShips(),
    ];
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

  public function actPassCrownManagerOfShippingFitShips()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownManagerOfShippingFitShips($args)
  {
    self::checkAction('actCrownManagerOfShippingFitShips');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsCrownManagerOfShippingFitShips();

    $continue = $args->continue;
    if ($continue) {
      Notifications::log('continue', []);
      $cost = count($stateArgs['shipsThatWillBeFitted']) * COST_TO_FIT_SHIP;
      $office = Offices::get(MANAGER_OF_SHIPPING);
      $crownPlayer = Crown::getPlayer();
      Notifications::fitShips($crownPlayer, $stateArgs['shipsThatWillBeFitted']);
      $office->pay($crownPlayer, $cost);
      foreach($stateArgs['shipsThatWillBeFitted'] as $ship) {
        Ships::insertOnTop($ship->getId(), Locations::shipsToBePlacedByCrown());
      }
      
    }
    // TODO: case where player pays crown to fit specific ships
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

  public function getAvailableShips()
  {
    $office = Offices::get(MANAGER_OF_SHIPPING);
    $treasury = $office->getTreasury();
    if ($treasury <= COST_TO_FIT_SHIP) {
      return [
        'crown' => [],
        'players' => [],
      ];
    }

    $ships = Ships::getAll();

    // Check unfitted ships
    $unfittedCrownShips = [];
    $unfittedPlayerShips = [];

    foreach ($ships as $ship) {
      if (!$ship->isUnfitted()) {
        continue;
      }
      $isUnfitted = $ship->isUnfitted();
      if ($isUnfitted && $ship->getOwnerPlayerId() === CROWN_PLAYER_ID) {
        $unfittedCrownShips[] = $ship;
      } else if ($isUnfitted) {
        $unfittedPlayerShips[] = $ship;
      }
    }

    return [
      'crown' => $unfittedCrownShips,
      'players' => $unfittedPlayerShips,
    ];
  }
}
