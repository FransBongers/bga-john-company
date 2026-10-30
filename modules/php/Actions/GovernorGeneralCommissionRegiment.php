<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Models\Player;

class GovernorGeneralCommissionRegiment extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_GENERAL_COMMISSION_REGIMENT;
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

  public function stGovernorGeneralCommissionRegiment()
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];

    Notifications::nextPhase(clienttranslate('Commission Regiment'));

    $this->ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_XOR,
      'children' => array_map(function ($presidencyId) use ($playerId) {
        return [
          'action' => PLACE_REGIMENT_IN_ARMY,
          'args' => [
            'presidencyId' => $presidencyId,
            'playerId' => $playerId,
          ]
        ];
      }, PRESIDENCIES),
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Governor General: ${you} must choose an army to place a ${tkn_regiment} in'),
        'description' => clienttranslate('Governor General: ${actplayer} must choose an army to place a ${tkn_regiment} in'),
        'args' => [
          'tkn_regiment' => clienttranslate('Regiment'),
        ]
      ],
    ]));

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
    return ArmyPieces::countInLocation(Locations::supplyRegiments()) > 0;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
