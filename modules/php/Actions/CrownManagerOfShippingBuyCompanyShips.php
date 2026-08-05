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

class CrownManagerOfShippingBuyCompanyShips extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected $companyShipsCrownWillBuy = [
    BULL => 0,
    STAG => 1,
    LION => 100, // Arbitrary number, higher than the number of available tokens
    BEAR => 1,
    PEACOCK => 0,
  ];

  public function getState()
  {
    return ST_CROWN_MANAGER_OF_SHIPPING_BUY_COMPANY_SHIPS;
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


  public function stCrownManagerOfShippingBuyCompanyShips()
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


  public function argsCrownManagerOfShippingBuyCompanyShips()
  {
    $climate = Crown::getClimate();
    $availableShips = $this->getAvailableOtherShips();


    $office = Offices::get(MANAGER_OF_SHIPPING);
    $treasury = $office->getTreasury();

    $shipsCrownWillBuy = [];

    for ($i = 0; $i < $this->companyShipsCrownWillBuy[$climate]; $i++) {
      if ($treasury >= COST_TO_BUY_COMPANY_SHIP && isset($availableShips[$i])) {
        $shipsCrownWillBuy[] = $availableShips[$i];
        $treasury -= COST_TO_BUY_COMPANY_SHIP;
      } else {
        break;
      }
    }

    return [
      'shipsCrownWillBuy' => $shipsCrownWillBuy,
      'playerOptions' => $this->getPlayerOptions($climate, $treasury, count($shipsCrownWillBuy) > 0, count($availableShips) - count($shipsCrownWillBuy)),
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

  public function actPassCrownManagerOfShippingBuyCompanyShips()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownManagerOfShippingBuyCompanyShips($args)
  {
    self::checkAction('actCrownManagerOfShippingBuyCompanyShips');
    $playerId = $this->checkPlayer();

    $option = property_exists($args, 'option') ? $args->option : null;
    $continue = property_exists($args, 'continue') ? $args->continue : false;

    $stateArgs = $this->argsCrownManagerOfShippingBuyCompanyShips();

    if ($continue) {
      // handle crown payment and resolve state
      // Deavtivate player and resolve if all players are inactive?
      $this->resolveAction([], true);
    }
    if ($option === null || !isset($stateArgs['playerOptions'][$playerId])) {
      throw new \feException("ERROR_035");
    }

    $playerOption = $stateArgs['playerOptions'][$playerId];

    if ($playerOption['option'] !== $option) {
      throw new \feException("ERROR_036");
    }


    $player = Players::get($playerId);
    $family = $player->getFamily();
    $office = Offices::get(MANAGER_OF_SHIPPING);
    $crownPlayer = Crown::getPlayer();

    switch ($option) {
      case BUY_COMPANY_SHIP:
        $ship = Ships::getOtherShipFromSupply(COMPANY_SHIP);
        Ships::insertOnTop($ship->getId(), Locations::shipsToBePlacedByCrown());
        $cost = $playerOption['promiseCubeCost'];
        $family->payPromiseCubes($cost, false);
        Notifications::payPromiseCubesToBuyCompanyShip($player, $cost, [$ship]);
        Notifications::buyCompanyShips($crownPlayer, [$ship]);
        $office->pay($crownPlayer, COST_TO_BUY_COMPANY_SHIP);
        break;
      case DO_NOT_BUY_COMPANY_SHIP:
        break;
      case BUY_AS_MANY_SHIPS_AS_YOU_WISH:
        break;
      default:
        throw new \feException("ERROR_037");
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

  public function getAvailableOtherShips()
  {
    return Ships::getInLocationOrdered(Locations::supplyOtherShips())->toArray();
  }

  public function getPlayerOptions($climate, $treasury, $crownBuysCompanyShips, $numberOfRemainingShipsAvailable)
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();

    $promiseCubes = Crown::getPromiseCubesForActivePlayers($info);
    $playerOptions = [];

    foreach ($promiseCubes as $playerId => $playerCubeCount) {
      switch ($climate) {
        case BULL:
          if ($playerCubeCount >= 1 && $numberOfRemainingShipsAvailable > 0 && $treasury >= COST_TO_BUY_COMPANY_SHIP) {
            $playerOptions[$playerId] = [
              'option' => BUY_COMPANY_SHIP,
              'promiseCubeCost' => 1
            ];
          }
          break;
        case STAG:
          if ($playerCubeCount >= 2 && $crownBuysCompanyShips) {
            $playerOptions[$playerId] = [
              'option' => DO_NOT_BUY_COMPANY_SHIP,
              'promiseCubeCost' => 2
            ];
          }
          break;
        case LION:
          if ($playerCubeCount >= 3 && $crownBuysCompanyShips) {
            $playerOptions[$playerId] = [
              'option' => BUY_AS_MANY_SHIPS_AS_YOU_WISH,
              'promiseCubeCost' => 3
            ];
          }
          break;
        case BEAR:
          if ($playerCubeCount >= 1 && $crownBuysCompanyShips) {
            $playerOptions[$playerId] = [
              'option' => DO_NOT_BUY_COMPANY_SHIP,
              'promiseCubeCost' => 1
            ];
          }
          break;
        case PEACOCK:
          if ($playerCubeCount >= 2  && $numberOfRemainingShipsAvailable > 0 && $treasury >= COST_TO_BUY_COMPANY_SHIP) {
            $playerOptions[$playerId] = [
              'option' => BUY_COMPANY_SHIP,
              'promiseCubeCost' => 2
            ];
          }
          break;
      }
    }

    return $playerOptions;
  }
}
