<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class GovernorCommissionRegiment extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_COMMISSION_REGIMENT;
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

  public function stGovernorCommissionRegiment()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId'];
    $playerId = $args['playerId'];
    $presidencyId = Offices::get($officeId)->getPresidencyId();

    $regiment = ArmyPieces::getTopOf(Locations::supplyRegiments());
    $regiment->placeInArmy(Players::get($playerId), $presidencyId);

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('Commission a Regiment');
  }

  public function isDoable(Player $player): bool
  {
    return ArmyPieces::getTopOf(Locations::supplyRegiments()) !== null;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
