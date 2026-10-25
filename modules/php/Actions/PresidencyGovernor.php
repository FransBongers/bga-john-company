<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class PresidencyGovernor extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PRESIDENCY_GOVERNOR;
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

  public function stPresidencyGovernor()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId']; // president office
    $presidencyId = $args['presidencyId'];

    $governorOffice = Offices::get($officeId);

    Notifications::nextPhase($governorOffice->getTitle());

    $this->ctx->insertAsBrother(
      Engine::buildTree(
        [
          'children' => [
            [
              'action' => GOVERNOR_ADMINISTER,
              'playerId' => 'some',
              'activePlayerIds' => [$governorOffice->getPlayerId()],
              'optional' => true,
              'args' => [
                'officeId' => $governorOffice->getId(),
                'presidencyId' => $presidencyId,
                'first' => true,
              ],
            ],
            [
              'action' => TIMING_WINDOW_CHECK,
              'args' => [
                TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
                LAW_CARD => [BOARD_OF_CONTROL_ID],
                TIMING_DATA => [
                  'officeId' => $governorOffice->getId()
                ],
              ],
            ]
          ],
        ]
      )
    );

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
    $officeId = $args['officeId'];
    $office = Offices::get($officeId);

    return $office->getTitle();
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
