<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class GovernorTax extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_TAX;
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

  public function stGovernorTax()
  {

    $siblings = $this->ctx->getParent()->getParent()->getChildren();
    // start at minus one, because the current action is also included in the siblings list
    $resolvedTaxActions = -1;
    foreach ($siblings as $sibling) {
      $info = $sibling->getInfo();
      // 2 is the index of choice, indicating a resolved tax action
      if ($sibling->getType() === NODE_XOR && isset($info['choice']) && $info['choice'] === 2) {
        $resolvedTaxActions++;
      }
    }

    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];
    $regionId = Offices::get($args['officeId'])->getRegionId();

    $firstTax = $resolvedTaxActions === 0;

    $node = [
      'children' => [
        [
          'type' => NODE_XOR,
          'playerId' => $playerId,
          'children' => [
            [
              'action' => ADD_CASH,
              'args' => [
                'targetType' => BALANCE,
                'targetArg' => null,
                'playerId' => $playerId,
                'amount' => 2,
              ],
            ],
            [
              'action' => ADD_CASH,
              'args' => [
                'targetType' => OFFICE,
                'targetArg' => PRESIDENCY_PRESIDENT_OFFICE_MAP[Offices::get($args['officeId'])->getPresidencyId()],
                'playerId' => $playerId,
                'amount' => 2,
              ],
            ],
          ],
        ]
      ]
    ];

    if (!$firstTax) {
      $node['children'][] = [
        'action' => ADD_UNREST,
        'args' => [
          'playerId' => $playerId,
          'regionId' => $regionId,
          'amount' => 1,
        ],
      ];
    }

    $this->ctx->insertAsBrother(Engine::buildTree($node));

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
    return clienttranslate('Tax');
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
