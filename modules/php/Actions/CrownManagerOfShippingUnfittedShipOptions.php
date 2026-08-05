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
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;

class CrownManagerOfShippingUnfittedShipOptions extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    // return ST_CROWN_MANAGER_OF_SHIPPING_UNFITTED_SHIP_OPTIONS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.


  public function argsCrownManagerOfShippingUnfittedShipOptions()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerIds = $info['activePlayerIds'];

    $shipId = $info['shipId'];
    $location = $info['location'];
    $phase = $info['phase'];

    $promiseCubes = [];

    foreach($playerIds as $playerId) {
      $promiseCubes[$playerId] = Players::get($playerId)->getFamily()->getCrownPromiseCubes();
    }

    /**
     * Phase is unfitted:
     * - Player can choose different ship if available
     * - Player can choose different location (if player has enough promise cubes)
     * 
     * 
     */
    $superintendentInPlay = Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA)->getFamilyMemberId() !== null;

    $data = [
      'phase' => $phase,
      'ship' => Ships::get($shipId),
      'location' => $location,
      'promiseCubes' => $promiseCubes,
      // 'shipPromis=eCubeCost' => 
      'options' => [
        'ships' => Utils::filter(Ships::getAll()->toArray(), function ($ship) use ($shipId) {
          return $ship->getId() !== $shipId && $ship->isUnfitted(); 
        }),
        'locations' => Utils::filter(SHIP_LOCATIONS, function ($shipLocation) use ($location, $superintendentInPlay) {
          if ($location === CHINA && !$superintendentInPlay) {
            return false;
          }
          return $shipLocation !== $location;
        }),
      ]
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

  public function actPassCrownManagerOfShippingUnfittedShipOptions()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownManagerOfShippingUnfittedShipOptions($args)
  {
    self::checkAction('actCrownManagerOfShippingUnfittedShipOptions');
    $playerId = $this->checkPlayer();

   
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...
  


}
