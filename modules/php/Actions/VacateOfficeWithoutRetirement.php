<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Managers\Offices;

class VacateOfficeWithoutRetirement extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_VACATE_OFFICE_WITHOUT_RETIREMENT;
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

  public function stVacateOfficeWithoutRetirement()
  {
    $args = $this->ctx->getArgs();
    $office = Offices::get($args[OFFICE_ID]);
    $actingPlayerId = $args['actingPlayerId'];
    $currentOwner = $office->getFamily()->getPlayer();
    $office->returnFamilyMemberToSupply();
    $office->moveToVacantOffices($currentOwner);

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
    $args = $this->ctx->getArgs();
    $office = Offices::get($args[OFFICE_ID]);
    return $office->getTitle();
  }

  public function isDoable(\Bga\Games\JohnCompany\Models\Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?\Bga\Games\JohnCompany\Models\Player $player = null): bool
  {
    return true;
  }
}
