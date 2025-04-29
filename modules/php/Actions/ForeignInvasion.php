<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\SetupCard;

class ForeignInvasion extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_FOREIGN_INVASION;
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


  public function stForeignInvasion()
  {
    $info = $this->ctx->getInfo();
    $regionId = $info['regionId'];

    $regions = Regions::getAll();

    $defender = $regions[$regionId];

    $attackOnTheCompany = $defender->isCompanyControlled();
    $attackStrength = bga_rand(1, 6);
    Notifications::foreignInvasion($defender->getName(), $attackStrength);

    if ($attackOnTheCompany) {
      // check how to resolve and insert defender state

    } else {
      $this->resolveInvasionAgainstRegion($regions, $defender, $attackStrength);
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

  private function resolveInvasionAgainstRegion($regions, $defender, $attackStrength)
  {

    $defenderStrength = ResolveCrisis::getDefenderStrengthInvasion($regions, $defender);

    Notifications::crisisResult($attackStrength, $defenderStrength);

    if ($attackStrength <= $defenderStrength) {
      return;
    }
    $defender->closeAllOrders();

    if ($defender->isCapital()) {
      $defender->shatterEmpire();
    } else if ($defender->isDominatedByRegion()) {
      $defender->becomeSovereign();
    }
  }
}
