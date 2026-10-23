<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\JoCoUtils;

class PresidentTradeResolveCheck extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PRESIDENT_TRADE_RESOLVE_CHECK;
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

  public function stPresidentTradeResolveCheck()
  {
    $args = $this->ctx->getArgs();
    $officeId = $args['officeId'];
    $selectedRegionIds = $args['regionIds'];

    $latestCheck = Globals::getLatestCheck();

    $playerMakingCheckId = $latestCheck['playerId'];
    $familyMemberId = $latestCheck['familyMemberId'];
    $result = $latestCheck['result'];

    if ($result === CATASTROPHIC_FAILURE) {
      JoCoUtils::resolveCatastrophicFailure(Players::get($playerMakingCheckId), FamilyMembers::get($familyMemberId));
    } else   if ($result === SUCCESS) {
      $action = [
        'action' => PRESIDENT_TRADE_FILL_ORDERS,
        'playerId' => 'some',
        'activePlayerIds' => [$playerMakingCheckId],
        'officeId' => $officeId,
        'regionIds' => $selectedRegionIds,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
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
    return clienttranslate('PresidentTradeResolveCheck');
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
