<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Player;

class GovernorGeneralTax extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return \ST_GOVERNOR_GENERAL_TAX;
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

  public function stGovernorGeneralTax()
  {
    $args = $this->ctx->getArgs();
    $playerId = $args['playerId'];

    Notifications::nextPhase(clienttranslate('Tax'));

    $this->ctx->insertAsBrother(Engine::buildTree([
      'children' => [
        $this->getIncreaseTreasuriesNode($playerId),
        $this->getPlaceUnrestNode($playerId),
      ]
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

  private function getIncreaseTreasuriesNode(int $playerId)
  {
    $targets = [
      MANAGER_OF_SHIPPING,
      PRESIDENT_OF_BOMBAY,
      PRESIDENT_OF_MADRAS,
      PRESIDENT_OF_BENGAL,
      BALANCE,
    ];


    return [
      'type' => NODE_XOR,
      'children' => array_map(function ($target) use ($playerId) {
        return [
          'action' => ADD_CASH,
          'args' => [
            'targetType' => $target === BALANCE ? BALANCE : OFFICE,
            'targetArg' => $target === BALANCE ? null : $target,
            'playerId' => $playerId,
            'amount' => 2,
          ]
        ];
      }, $targets),
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Governor General: ${you} must add £2 to a treasury or to the Company Balance'),
        'description' => clienttranslate('Governor General: ${actplayer} must add £2 to a treasury or to the Company Balance'),
      ],
    ];
  }

  private function getPlaceUnrestNode(int $playerId)
  {
    $resolvedNodes = Engine::getResolvedActions([PLACE_UNREST_IN_REGION]);
    $regionWithUnrestPlaced = [];
    foreach ($resolvedNodes as $node) {
      $resolutionArgs = $node->getActionResolutionArgs();
      if (isset($resolutionArgs['regionId'])) {
        $regionWithUnrestPlaced[] = $resolutionArgs['regionId'];
      }
    }

    $companyControlledRegions = Regions::getCompanyControlledRegions();
    $availableRegions = array_filter($companyControlledRegions, function ($region) use ($regionWithUnrestPlaced) {
      return !in_array($region->getId(), $regionWithUnrestPlaced);
    });

    return [
      'type' => NODE_XOR,
      'children' => array_map(function ($region) use ($playerId) {
        return [
          'action' => PLACE_UNREST_IN_REGION,
          'args' => [
            'regionId' => $region->getId(),
            'playerId' => $playerId,
          ]
        ];
      }, $availableRegions),
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Governor General: ${you} must choose a region to place ${tkn_unrest} in'),
        'description' => clienttranslate('Governor General: ${actplayer} must choose a region to place ${tkn_unrest} in'),
        'args' => [
          'tkn_unrest' => Notifications::tknUnrest(),
        ]
      ],
    ];
  }

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
