<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\SetupCard;
use Bga\Games\JohnCompany\Utils\TradeRoutes;

class CrownManagerOfShippingPlaceShips extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  private $seaZonePresidencyMap = [
    WEST_INDIAN => BOMBAY_PRESIDENCY,
    SOUTH_INDIAN => MADRAS_PRESIDENCY,
    EAST_INDIAN => BENGAL_PRESIDENCY,
  ];

  public function getState()
  {
    return ST_CROWN_MANAGER_OF_SHIPPING_PLACE_SHIPS;
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


  public function stCrownManagerOfShippingPlaceShips()
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


  public function argsCrownManagerOfShippingPlaceShips()
  {

    $ships = Ships::getInLocationOrdered(Locations::shipsToBePlacedByCrown())->toArray();

    return [
      'ships' => $ships,
      'test' => $this->getPresidenciesWithHighestNumberOfWriters(false,),
      'seaZone' => $this->getSeaZoneWhereCrownWillPlaceShips(),
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

  public function actPassCrownManagerOfShippingPlaceShips()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownManagerOfShippingPlaceShips($args)
  {
    self::checkAction('actCrownManagerOfShippingPlaceShips');
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

  private function getSeaZonesWithLongestOpenTradeRoute()
  {
    $tradeRouteLength = [
      WEST_INDIAN => count(TradeRoutes::getOrdersForTradeRoute(Offices::get(PRESIDENT_OF_BOMBAY)->getHomePortOrderId(), 16)['orders']),
      SOUTH_INDIAN => count(TradeRoutes::getOrdersForTradeRoute(Offices::get(PRESIDENT_OF_MADRAS)->getHomePortOrderId(), 16)['orders']),
      EAST_INDIAN => count(TradeRoutes::getOrdersForTradeRoute(Offices::get(PRESIDENT_OF_BENGAL)->getHomePortOrderId(), 16)['orders']),
    ];

    $seaZones = [];
    $max = 0;

    return $this->getKeysWithHighestValues($tradeRouteLength);
  }

  private function getKeysWithHighestValues($data)
  {
    $result = [];
    $max = 0;

    foreach ($data as $key => $value) {

      if ($value === $max) {
        $result[] = $key;
      } else if ($value > $max) {
        $result = [$key];
        $max = $value;
      }
    }
    return $result;
  }

  private function getPresidenciesWithHighestNumberOfWriters($crownOnly = true, $presidencyFilter = PRESIDENCIES)
  {
    $writerLocationPresidencyMap = [
      Locations::writers(BOMBAY) => BOMBAY_PRESIDENCY,
      Locations::writers(MADRAS) => MADRAS_PRESIDENCY,
      Locations::writers(BENGAL) => BENGAL_PRESIDENCY,
    ];

    $writerCount = [];

    foreach ($presidencyFilter as $presidency) {
      $writerCount[$presidency] = 0;
    }

    $familyMembers = FamilyMembers::getWriters();
    foreach ($familyMembers as $writer) {
      if ($crownOnly && $writer->getFamilyId() !== CROWN) {
        continue;
      }
      $presidency = $writerLocationPresidencyMap[$writer->getLocation()];

      if (!isset($writerCount[$presidency])) {
        continue;
      }

      $writerCount[$presidency]++;
    }

    return $this->getKeysWithHighestValues($writerCount);
  }

  private function mapSeaZonesToPresidencies($seaZones)
  {
    return array_map(function ($seaZone) {
      return $this->seaZonePresidencyMap[$seaZone];
    }, $seaZones);
  }

  private function getBullClimateSeaZone()
  {
    $seaZones = $this->getSeaZonesWithLongestOpenTradeRoute();
    if (count($seaZones) === 1) {
      return $seaZones[0];
    }

    $crownSeaZones = Utils::filter($seaZones, function ($seaZone) {
      return Crown::isCrownPresidency($this->seaZonePresidencyMap[$seaZone]);
    });

    if (count($crownSeaZones) === 1) {
      return $crownSeaZones[0];
    } else if ($crownSeaZones > 1) {
      $seaZones = $crownSeaZones;
    }
    return PRESIDENCY_SEA_ZONE_MAP[Crown::getPresidencyWithHighestPriority($this->mapSeaZonesToPresidencies($seaZones))];
  }



  private function getStagClimateSeaZone()
  {
    $seaZones = $this->getSeaZonesWithLongestOpenTradeRoute();
    if (count($seaZones) === 1) {
      return $seaZones[0];
    }

    $presidenciesWithHighestCrownWriterCount = $this->getPresidenciesWithHighestNumberOfWriters(true, $this->mapSeaZonesToPresidencies($seaZones));

    // Determine highest priority straight away. If count is 1 it will have highers priority
    return PRESIDENCY_SEA_ZONE_MAP[Crown::getPresidencyWithHighestPriority($presidenciesWithHighestCrownWriterCount)];
  }

  public function getSeaZoneWhereCrownWillPlaceShips()
  {
    $climate = Crown::getClimate();

    switch ($climate) {
      case BULL:
        return $this->getBullClimateSeaZone();
      case STAG:
        return $this->getStagClimateSeaZone();
      case LION:
      case BEAR:
      case PEACOCK:
    }
  }
}
