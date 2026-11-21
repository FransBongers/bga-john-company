<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Managers\Prizes;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Models\Player;

class LondonSeasonOrder extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_LONDON_SEASON_ORDER;
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

  public function stLondonSeasonOrder()
  {
    $playerIds = Prizes::getLondonSeasonOrder();

    $chooseCardActions = [];
    foreach ($playerIds as $playerId) {
      $chooseCardActions[] = [
        'children' => [
          [
            'action' => TIMING_WINDOW_CHECK,
            'args' => [
              TIMING_WINDOW => START_OF_LONDON_SEASON_CHOOSE_CARD,
              ITEM_ID => $playerId,
            ],
          ],
          [
            'action' => LONDON_SEASON_CHOOSE_CARD,
            'playerId' => 'some',
            'activePlayerIds' => [$playerId],
          ]
        ]
      ];
    }

    if (count($chooseCardActions) > 0) {
      $this->ctx->insertAsBrother(Engine::buildTree([
        'children' => $chooseCardActions
      ]));
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
    return clienttranslate('LondonSeasonOrder');
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
