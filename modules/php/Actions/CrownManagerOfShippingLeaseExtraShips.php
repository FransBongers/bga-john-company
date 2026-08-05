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

class CrownManagerOfShippingLeaseExtraShips extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_MANAGER_OF_SHIPPING_LEASE_EXTRA_SHIPS;
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


  public function stCrownManagerOfShippingLeaseExtraShips()
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


  public function argsCrownManagerOfShippingLeaseExtraShips() {
    $availableShipCount = Ships::countInLocation(Locations::supplyOtherShips());

    $office = Offices::get(MANAGER_OF_SHIPPING);
    $treasury = $office->getTreasury();

    $numberOfExtraShipsCrownCanPayFor = floor($treasury / COST_TO_LEASE_EXTRA_SHIP);

    $numberOfShipsCrownWillLease = min($availableShipCount, $numberOfExtraShipsCrownCanPayFor);

    return [
      'numberOfShipsCrownWillLease' => $numberOfShipsCrownWillLease,
      'optionToLeaveTwoUnspent' => $this->getPlayerOptions($treasury),
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

  public function actPassCrownManagerOfShippingLeaseExtraShips()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownManagerOfShippingLeaseExtraShips($args)
  {
    self::checkAction('actCrownManagerOfShippingLeaseExtraShips');
    $playerId = $this->checkPlayer();

    $leaveTwoUnspent = property_exists($args, 'leaveTwoUnspent') ? $args->leaveTwoUnspent : null;
    $continue = property_exists($args, 'continue') ? $args->continue : false;

    
    $stateArgs = $this->argsCrownManagerOfShippingLeaseExtraShips();

    $office = Offices::get(MANAGER_OF_SHIPPING);
    $crownPlayer = Crown::getPlayer();
    $numberOfShipsCrownWillLease = $stateArgs['numberOfShipsCrownWillLease'];

    if ($continue && $numberOfShipsCrownWillLease > 0) {
      $ships = [];
      for ($i = 0; $i < $numberOfShipsCrownWillLease; $i++) {
        $ship = Ships::getOtherShipFromSupply(EXTRA_SHIP);
        Ships::insertOnTop($ship->getId(), Locations::shipsToBePlacedByCrown());
        $ships[] = $ship;
      }
      Notifications::leaseExtraShips($crownPlayer, $ships);
      $office->pay($crownPlayer, COST_TO_LEASE_EXTRA_SHIP * $numberOfShipsCrownWillLease);   
    } else if ($continue) {
      Notifications::message(clienttranslate('${player_name} does not lease any Extra Ships'), [
        'player' => $crownPlayer
      ]);
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

  public function getPlayerOptions($treasury)
  {
    $info = $this->ctx->getInfo();

    $promiseCubes = Crown::getPromiseCubesForActivePlayers($info);
    $playerOptions = [];

    foreach ($promiseCubes as $playerId => $playerCubeCount) {
      $playerOptions[$playerId] = $playerCubeCount > 1 && $treasury >= 2 && $treasury % 2 === 0;
    }

    return $playerOptions;
  }

}
