<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Player;

class GovernorGeneralShipbuilding extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_GOVERNOR_GENERAL_SHIPBUILDING;
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

  public function stGovernorGeneralShipbuilding()
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];

    Notifications::nextPhase(clienttranslate('Shipbuilding'));

    $seaZones = SEA_ZONES;
    if (Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA)->isInPlay()) {
      $seaZones[] = CHINA;
    }

    $this->ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_XOR,
      'children' => array_map(function ($seaZone) use ($playerId) {
        return [
          'action' => PLACE_SHIP_IN_SEA_ZONE,
          'args' => [
            'location' => $seaZone,
            'playerId' => $playerId,
          ]
        ];
      }, $seaZones),
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Governor General: ${you} must choose a sea zone to place ${tkn_ship}'),
        'description' => clienttranslate('Governor General: ${actplayer} must choose a sea zone to place ${tkn_ship}'),
        'args' => [
          'tkn_ship' => implode(':', [COMPANY_SHIP, clienttranslate('Company ship')]),
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
    return clienttranslate('Build a Company Ship');
  }

  public function isDoable(Player $player): bool
  {
    return Ships::countInLocation(Locations::supplyOtherShips()) > 0;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
