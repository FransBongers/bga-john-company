<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class PresidencyPresident extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PRESIDENCY_PRESIDENT;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##.....##....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stPresidencyPresident()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId']; // president office
    $presidencyId = $args['presidencyId'];
    $presidentPlayerId = $args['presidentPlayerId'];
    $office = Offices::get($officeId);

    Notifications::nextPhase($office->getTitle());

    $this->ctx->insertAsBrother(
      Engine::buildTree(
        [
          'children' => [
            [
              'action' => PRESIDENT_TRADE,
              'playerId' => 'some',
              'optional' => true,
              'activePlayerIds' => [$presidentPlayerId],
              'args' => [
                'officeId' => $office->getId(),
                'presidencyId' => $presidencyId,
                'first' => true,
                'presidentPlayerId' => $presidentPlayerId

              ],
            ],
            [
              'action' => TIMING_WINDOW_CHECK,
              'args' => [
                TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
                LAW_CARD => [BOARD_OF_CONTROL_ID],
                TIMING_DATA => [
                  'officeId' => $office->getId()
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
    $officeId = $args[OFFICE_ID];
    $office = Offices::get($officeId);
    return [
      'log' => clienttranslate('${officeTitle} (Trade)'),
      'args' => [
        'officeTitle' => $office->getTitle(),
      ]
    ];
  }

  public function isDoable(Player $player): bool
  {
    $args = $this->ctx->getArgs();
    $officeId = $args[OFFICE_ID];
    $office = Offices::get($officeId);
    $options = AtomicActions::get(PRESIDENT_TRADE)->getOrderOptions($office);
    return count($options) > 0 && $office->getTreasury() > 0;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
