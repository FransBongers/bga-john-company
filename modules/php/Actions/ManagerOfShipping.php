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
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class ManagerOfShipping extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_MANAGER_OF_SHIPPING;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsManagerOfShipping()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $enterprises = Enterprises::getAll();
    $map = Families::getFamilyIdPlayerIdMap();

    $playerShips = [];
    $otherShips = [];
    $ships = Ships::getAll();

    foreach ($ships as $ship) {
      if ($ship->isUnfitted()) {
        $playerShips[] = $ship;
      } else if ($ship->isOtherShip() && $ship->isInSupply()) {
        $otherShips[] = $ship;
      }
    }


    $data = [
      'activePlayerIds' => [$activePlayerId],
      'playerShips' => $playerShips,
      'otherShips' => $otherShips,
      'treasury' => Offices::get(MANAGER_OF_SHIPPING)->getTreasury(),
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

  public function actPassManagerOfShipping()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actManagerOfShipping($args)
  {
    self::checkAction('actManagerOfShipping');
    $playerId = $this->checkPlayer();

    $playerShips = $args->playerShips;
    $companyShips = $args->companyShips;
    $extraShips = $args->extraShips;

    $office = Offices::get(MANAGER_OF_SHIPPING);
    $player = Players::get($playerId);

    $stateArgs = $this->argsManagerOfShipping();

    $playerShipCount = 0;
    $totalPayment = 0;
    // Place player ships
    foreach($playerShips as $shipId => $seaZone) {
      $ship = Utils::array_find($stateArgs['playerShips'], function ($playerShip) use ($shipId) {
        return $shipId === $playerShip->getId();
      });
      if ($ship === null) {
        throw new \feException("ERROR_014");
      }
      $playerShipCount++;
      $ship->place($ship->getOwner(), $seaZone);
      $totalPayment += 3;
    }

    // Place company ships
    foreach($companyShips as $shipId => $seaZone) {
      if ($playerShipCount < count($stateArgs['playerShips'])) {
        throw new \feException("ERROR_015");
      }
      $this->placeOtherShip($stateArgs, $player, $shipId, $seaZone, COMPANY_SHIP);
      $totalPayment += 5;
    }

    // Place extra ships
    foreach($extraShips as $shipId => $seaZone) {
      $this->placeOtherShip($stateArgs, $player, $shipId, $seaZone, EXTRA_SHIP);
      $totalPayment += 2;
    }
    $office->incTreasury(-$totalPayment);
    $treasury = $office->getTreasury();
    
    if ($treasury < 0 || $treasury > 2) {
      throw new \feException("ERROR_016");
    }

    Notifications::payFromTreasury($player, $office, $totalPayment, $treasury);
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

  private function placeOtherShip($stateArgs, $player, $shipId, $seaZone, $type) {
    $ship = Utils::array_find($stateArgs['otherShips'], function ($otherShip) use ($shipId) {
      return $shipId === $otherShip->getId();
    });
    if ($ship === null) {
      throw new \feException("ERROR_017");
    }
    $ship->place($player, $seaZone, $type);
  }
}
