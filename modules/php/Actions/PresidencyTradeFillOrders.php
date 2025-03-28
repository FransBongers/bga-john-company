<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class PresidencyTradeFillOrders extends \Bga\Games\JohnCompany\Actions\PresidencyActions
{
  public function getState()
  {
    return ST_PRESIDENCY_TRADE_FILL_ORDERS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPresidencyTradeFillOrders()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $office = Offices::get($info['officeId']);
    $regionIds = $info['regionIds'];

    $options = $this->getOrderOptions($office, $regionIds);

    $data = [
      'activePlayerIds' => [$activePlayerId],
      'orders' => $options['orders'],
      'homePortOrderId' => $options['homePortOrderId'],
      'officeId' => $info['officeId'],
      'writers' => FamilyMembers::getWriters($office->getRegionId()),
      'numberOfOrdersToFill' => min($options['shipCount'], count($options['orders'])),
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

  public function actPassPresidencyTradeFillOrders()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actPresidencyTradeFillOrders($args)
  {
    self::checkAction('actPresidencyTradeFillOrders');
    $playerId = $this->checkPlayer();

    $selectedRegionIds = $args->selectedRegionIds;
    $spend = $args->spend;
    $makeCheck = $args->makeCheck; // TODO: use to differentiate between propose and act

    $stageArgs = $this->argsPresidencyTradeFillOrders();
    $options = $stageArgs['options'];
    $officeId = $stageArgs['officeId'];

    if (!$this->canBePerformed($officeId)) {
      throw new \feException("ERROR_023");
    }

    // All regions need to be withing range
    foreach ($selectedRegionIds as $regionId) {
      $region = Utils::array_find($stageArgs['options']['regions'], function ($region) use ($regionId) {
        return $region->getId() === $regionId;
      });
      if ($region === null) {
        throw new \feException("ERROR_024");
      }
    }

    // Home region needs to be selected
    if (!in_array($options['homeRegionId'], $selectedRegionIds)) {
      throw new \feException("ERROR_025");
    }

    // Treasury needs to have required cash
    if ($stageArgs['treasury'] < $spend) {
      throw new \feException("ERROR_026");
    }

    $office = Offices::get($officeId);
    $player = Players::get($playerId);

    $penalty = count($selectedRegionIds) - 1;
    $numberOfDice = $spend - $penalty;
    $checkResult = JoCoUtils::makeCheck($player, $office, $spend);

    Notifications::log('actPresidencyTradeFillOrders', $args);
    if ($checkResult === SUCCESS) {
      $action = [
        'action' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId]
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    }

    // $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  /**
   * There need to be ships
   * There needs to be money in the treasury
   * Home port order needs to be open
   * No succesful trade action has been performed yet
   */
  public function canBePerformed($officeId)
  {
    $office = Offices::get($officeId);
    if ($office->getFamilyMemberId() === null) {
      return false;
    }
    if ($office->getTreasury() === 0) {
      return false;
    }
    if (Ships::countInLocation($office->getSeaZone()) === 0) {
      return false;
    }
    if (Orders::get($office->getHomePortOrderId())->getStatus() !== OPEN) {
      return false;
    }

    return true;
  }
}
