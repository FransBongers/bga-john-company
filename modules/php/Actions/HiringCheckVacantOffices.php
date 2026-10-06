<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class HiringCheckVacantOffices extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_HIRING_CHECK_VACANT_OFFICES;
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

  public function stHiringCheckVacantOffices()
  {
    $offices = Offices::getInLocation(Locations::vacantOffices())->toArray();
    usort($offices, fn($a, $b) => $a->getHirePriority() <=> $b->getHirePriority());

    $vacantOffice = false;

    foreach ($offices as $office) {
      if (count($office->getCandidatesForHiring()) === 0) {
        // TODO: Log message?
        continue;
      }

      $hirer = $office->getHiringPlayerId();
      if ($hirer === null) {
        // TODO: Log message?
        continue;
      }

      $vacantOffice = true;

      // Inserted after the current node, so the hire node ends up before the re-check
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => HIRING_CHECK_VACANT_OFFICES,
      ]));
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => HIRING_HIRE_FAMILY_MEMBER,
        'playerId' => 'some',
        'activePlayerIds' => [$hirer],
        'args' => [
          'officeId' => $office->getId(),
          'hirerPlayerId' => $hirer,
        ],
      ]));
      break;
    }

    if (!$vacantOffice) {
      $firstTimeResolving = count(Engine::getResolvedActions([HIRING_CHECK_VACANT_OFFICES])) === 0;
      // TODO: different text if there are open postions that cannot be filled?
      Notifications::message($firstTimeResolving ? clienttranslate('No open positions') : clienttranslate('No more open positions'), []);
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

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('HiringCheckVacantOffices');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
