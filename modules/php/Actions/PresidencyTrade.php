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
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class PresidencyTrade extends \Bga\Games\JohnCompany\Actions\PresidencyActions
{
  public function getState()
  {
    return ST_PRESIDENCY_TRADE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPresidencyTrade()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $office = Offices::get($info['officeId']);

    $treasury = $office->getTreasury();

    $data = [
      'activePlayerIds' => [$activePlayerId],
      'treasury' => $treasury,
      'options' => $this->getOrderOptions($office),
      'officeId' => $info['officeId'],
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

  public function actPassPresidencyTrade()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actPresidencyTrade($args)
  {
    self::checkAction('actPresidencyTrade');
    $playerId = $this->checkPlayer();

    $selectedRegionIds = $args->selectedRegionIds;
    $spend = $args->spend;
    $makeCheck = $args->makeCheck; // TODO: use to differentiate between propose and act

    $stageArgs = $this->argsPresidencyTrade();
    $options = $stageArgs['options'];
    $officeId = $stageArgs['officeId'];

    if (!$this->canBePerformed($officeId)) {
      throw new \feException("ERROR_023");
    }

    // All regions need to be withing range
    foreach($selectedRegionIds as $regionId) {
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
    if ($numberOfDice < 1) {
      throw new \feException("ERROR_027");
    }

    $office->pay($player, $spend);

    $checkResult = JoCoUtils::makeCheck($player, $office, $numberOfDice);

    if ($checkResult === SUCCESS) {
      $action = [
        'action' => PRESIDENCY_TRADE_FILL_ORDERS,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
        'regionIds' => $selectedRegionIds,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    }

    $this->resolveAction([], true);
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
