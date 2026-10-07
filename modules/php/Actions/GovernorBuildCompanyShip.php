<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class GovernorBuildCompanyShip extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_BUILD_COMPANY_SHIP;
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

  public function stGovernorBuildCompanyShip()
  {
    list($regionId, $playerId, $office) = $this->getArgs();

    $shipUnderConstruction = Ships::getTopOf(Locations::shipUnderConstruction($regionId));
    $player = Players::get($playerId);

    if ($shipUnderConstruction !== null) {
      $presidencyId = $office->getPresidencyId();
      $sea = PRESIDENCY_SEA_ZONE_MAP[$presidencyId];
      $shipUnderConstruction->moveTo($player, $sea);
    } else {
      $ship = Ships::getTopOf(Locations::supplyOtherShips());
      $ship->place($player, Locations::shipUnderConstruction($regionId), COMPANY_SHIP);
    }

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getArgs(): array
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId'];
    $playerId = $args['playerId'];

    $office = Offices::get($officeId);
    $regionId = $office->getRegionId();
    return [$regionId, $playerId, $office];
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('Build a Company Ship');
  }

  public function isDoable(Player $player): bool
  {
    list($regionId, $playerId, $office) = $this->getArgs();

    return Ships::countInLocation(Locations::shipUnderConstruction($regionId)) > 0 || Ships::countInLocation(Locations::supplyOtherShips()) > 0;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
