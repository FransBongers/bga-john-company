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
      'companyBalance' => Company::getBalance(),
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

    $filledOrders = $args->filledOrders;

    $stateArgs = $this->argsPresidencyTradeFillOrders();
    $orders = $stateArgs['orders'];
    $writers = $stateArgs['writers'];

    Notifications::log('args', $args);
    if (count($filledOrders) !== $stateArgs['numberOfOrdersToFill']) {
      throw new \feException("ERROR_028");
    }

    $ordersThatCanBeFilled = [$stateArgs['homePortOrderId']];
    $companyBalanceIncrease = 0;

    $player = Players::get($playerId);

    $familyIncome = [
      $player->getFamilyId() => count($filledOrders), // player performing the action is president
    ];

    foreach ($filledOrders as $index => $data) {
      $orderId = $data->orderId;
      $filledBy = $data->filledBy;

      if (!in_array($orderId, $ordersThatCanBeFilled)) {
        throw new \feException("ERROR_029");
      }
      $order = $orders[$orderId];

      $ordersThatCanBeFilled = array_merge($ordersThatCanBeFilled, $order->getConnectedOrders());

      // There are still writers to place but according to input a filled token was placed
      if (count($writers) > 0 && $filledBy === FILLED) {
        throw new \feException("ERROR_030");
      }
      $familyMember = null;

      $filledByWriter = Utils::startsWith($filledBy, 'familyMember');
      if ($filledByWriter) {
        $familyMember = Utils::array_find($writers, function ($writer) use ($filledBy) {
          return $writer->getId() === $filledBy;
        });
        if ($familyMember === null) {
          throw new \feException("ERROR_031");
        }

        $familyId = $familyMember->getFamilyId();
        if (isset($familyIncome[$familyId])) {
          $familyIncome[$familyId] += 1;
        } else {
          $familyIncome[$familyId] = 1;
        }

        // $familyMember->setLocation($orderId);
        // Return writer from available writers array
        $writers = Utils::filter($writers, function ($writer) use ($filledBy) {
          return $writer->getId() !== $filledBy;
        });
      }

      $companyBalanceIncrease += $order->getValue();
      $order->fill($player, $familyMember);
      $families = Families::getAll();
    }

    $companyBalance = Company::incBalance($companyBalanceIncrease);
    Notifications::increaseCompanyBalance($player, $companyBalance, $companyBalanceIncrease);

    foreach ($familyIncome as $familyId => $amount) {
      $families[$familyId]->gainCash($amount);
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
