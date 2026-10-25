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
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
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
      'playerShips' => $playerShips,
      'otherShips' => $otherShips,
      'treasury' => Offices::get(MANAGER_OF_SHIPPING)->getTreasury(),
      'superintendentOfTradeInChinaInPlay' => Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA)->isInPlay(),
      'playerShipPrice' => $this->getPlayerShipPrice(),
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
    $playerShipPrice = $stateArgs['playerShipPrice'];

    $playerShipCount = 0;
    $totalPayment = 0;
    // Place player ships
    foreach ($playerShips as $shipId => $seaZone) {
      $ship = Utils::array_find($stateArgs['playerShips'], function ($playerShip) use ($shipId) {
        return $shipId === $playerShip->getId();
      });
      if ($ship === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_014");
      }
      $playerShipCount++;
      $ship->place($ship->getOwner(), $seaZone);
      $totalPayment += $playerShipPrice;
    }

    $totalCompanyAndExtraShips = 0;

    // Place company ships
    foreach ($companyShips as $shipId => $seaZone) {
      if ($playerShipCount < count($stateArgs['playerShips'])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_015");
      }
      $this->placeOtherShip($stateArgs, $player, $shipId, $seaZone, COMPANY_SHIP);
      $totalPayment += 5;
      $totalCompanyAndExtraShips++;
    }

    // Place extra ships
    foreach ($extraShips as $shipId => $seaZone) {
      $this->placeOtherShip($stateArgs, $player, $shipId, $seaZone, EXTRA_SHIP);
      $totalPayment += 2;
      $totalCompanyAndExtraShips++;
    }
    $office->incTreasury(-$totalPayment);
    $treasury = $office->getTreasury();

    if ($treasury < 0 || $treasury > 2) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_016");
    }

    Notifications::payFromTreasury($player, $office, $totalPayment, $treasury);

    $ownerFamily = LondonSeasonCards::getOwnerFamily(SHIPBUILDERS_ID);

    if ($ownerFamily !== null && $totalCompanyAndExtraShips > 0) {
      $ownerFamily->gainCash($totalCompanyAndExtraShips, LondonSeasonCards::get(SHIPBUILDERS_ID)->getTitle());
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

  private function getPlayerShipPrice()
  {
    if (LawCards::isInPlay(SHIP_SUBSIDY_ID)) {
      return 2;
    }
    return 3;
  }

  private function placeOtherShip($stateArgs, $player, $shipId, $seaZone, $type)
  {
    $ship = Utils::array_find($stateArgs['otherShips'], function ($otherShip) use ($shipId) {
      return $shipId === $otherShip->getId();
    });
    if ($ship === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_017");
    }
    $ship->place($player, $seaZone, $type);
  }
}
