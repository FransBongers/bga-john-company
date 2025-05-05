<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class DirectorOfTradeSpecialEnvoySuccess extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS;
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

  public function stDirectorOfTradeSpecialEnvoySuccess() {}

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsDirectorOfTradeSpecialEnvoySuccess()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];

    $data = [
      'activePlayerIds' => [$playerId],
      'closedOrders' => Orders::getClosedOrders(),
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassDirectorOfTradeSpecialEnvoySuccess()
  {
    $playerId = $this->checkPlayer();
    // $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actDirectorOfTradeSpecialEnvoySuccess($args)
  {
    self::checkAction('actDirectorOfTradeSpecialEnvoySuccess');
    $playerId = $this->checkPlayer();

    $orderId = $args->orderId;
    $perform = $args->perform;

    $stateArgs = $this->argsDirectorOfTradeSpecialEnvoySuccess();

    $player = Players::get($playerId);

    $order = Utils::array_find($stateArgs['closedOrders'], function ($closedOrder) use ($orderId) {
      return $closedOrder->getId() === $orderId;
    });

    if ($order === null) {
      throw new \feException("ERROR_011");
    }

    $order->open($player);

    if (Crown::isInGame()) {
      $this->checkIfPlayerGainsPromiseCubeFromCrown($player, $order);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function checkIfPlayerGainsPromiseCubeFromCrown($player, $order)
  {
    $crown = Families::get(CROWN);
    if ($crown->getCrownPromiseCubes() === 0 || in_array(Crown::getClimate(), [BEAR, PEACOCK])) {
      return;
    }
    $regionId = $order->getRegionId();
    if (!in_array($regionId, HOME_REGIONS)) {
      return;
    }
    $familyMembers = FamilyMembers::getAll()->toArray();
    $crownHasWriter = Utils::array_find($familyMembers, function ($familyMember) use ($regionId) {
      return $familyMember->getLocation() === Locations::writers($regionId);
    });
    if ($crownHasWriter) {
      $player->getFamily()->gainPromiseCubes(1);
    }
  }
}
