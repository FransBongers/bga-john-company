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
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class PresidentTradeFillOrders extends \Bga\Games\JohnCompany\Actions\PresidencyActions
{
  public function getState()
  {
    return ST_PRESIDENT_TRADE_FILL_ORDERS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsPresidentTradeFillOrders()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();

    $office = Offices::get($info['officeId']);
    $regionIds = $info['regionIds'];

    $options = $this->getOrderOptions($office, $regionIds);

    $data = [
      'companyBalance' => Company::getBalance(),
      'orders' => $options['orders'],
      'homePortOrderId' => $options['homePortOrderId'],
      'officeId' => $info['officeId'],
      'writers' => FamilyMembers::getWriters($office->getPresidencyId()),
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

  public function actPassPresidentTradeFillOrders()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actPresidentTradeFillOrders($args)
  {
    self::checkAction('actPresidentTradeFillOrders');
    $playerId = $this->checkPlayer();

    $filledOrders = $args->filledOrders;

    $stateArgs = $this->argsPresidentTradeFillOrders();
    $orders = $stateArgs['orders'];
    $writers = $stateArgs['writers'];

    if (count($filledOrders) !== $stateArgs['numberOfOrdersToFill']) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_028");
    }

    $ordersThatCanBeFilled = [$stateArgs['homePortOrderId']];
    $companyBalanceIncrease = 0;

    $player = Players::get($playerId);

    $income = [];

    $presidentBonus = count($filledOrders);

    $writerGraftReformInPlay = LawCards::isInPlay(WRITER_GRAFT_REFORM_ID);
    $tradeRegulationsInPlay = LawCards::isInPlay(TRADE_REGULATIONS_ID);
    if ($tradeRegulationsInPlay) {
      $income[COMPANY] = $presidentBonus;
    } else {
      $income[$player->getFamilyId()] = $presidentBonus; // player performing the action is president
    }

    $writerBonus = $this->getWriterBonus();
    foreach ($filledOrders as $index => $data) {
      $orderId = $data->orderId;
      $filledBy = $data->filledBy;

      if (!in_array($orderId, $ordersThatCanBeFilled)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_029");
      }
      $order = $orders[$orderId];

      $ordersThatCanBeFilled = array_merge($ordersThatCanBeFilled, $order->getConnectedOrders());

      // There are still writers to place but according to input a filled token was placed
      if (count($writers) > 0 && $filledBy === FILLED) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_030");
      }
      $familyMember = null;

      $filledByWriter = Utils::startsWith($filledBy, 'familyMember');
      if ($filledByWriter) {
        $familyMember = Utils::array_find($writers, function ($writer) use ($filledBy) {
          return $writer->getId() === $filledBy;
        });
        if ($familyMember === null) {
          throw new \Bga\GameFramework\VisibleSystemException("ERROR_031");
        }

        $bonusReceiver = $writerGraftReformInPlay ? COMPANY : $familyMember->getFamilyId();
        if (!isset($income[$bonusReceiver])) {
          $income[$bonusReceiver] = 0;
        }

        $income[$bonusReceiver] += $writerBonus;


        // $familyMember->setLocation($orderId);
        // Return writer from available writers array
        $writers = Utils::filter($writers, function ($writer) use ($filledBy) {
          return $writer->getId() !== $filledBy;
        });
      }

      $companyBalanceIncrease += $order->getValue();
      $order->fill($player, $familyMember);
    }

    $families = Families::getAll();

    $companyBalance = Company::incBalance($companyBalanceIncrease);
    Notifications::increaseCompanyBalance($player, $companyBalance, $companyBalanceIncrease);

    foreach ($income as $familyId => $amount) {
      if ($familyId === COMPANY) {
        $this->increaseCompanyBalance($amount, $tradeRegulationsInPlay, $writerGraftReformInPlay);
      } else {
        $families[$familyId]->gainCash($amount);
      }
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([
      'officeId' => $stateArgs[OFFICE_ID],
      'officeHolderBonus' => $tradeRegulationsInPlay ? 0 : $presidentBonus
    ], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function increaseCompanyBalance(int $amount, bool $tradeRegulationsInPlay, bool $writerGraftReformInPlay)
  {
    $balance = Company::incBalance($amount);
    $lawIds = [];
    if ($tradeRegulationsInPlay) {
      $lawIds[] = TRADE_REGULATIONS_ID;
    }
    if ($writerGraftReformInPlay) {
      $lawIds[] = WRITER_GRAFT_REFORM_ID;
    }

    $args = [
      'i18n' => []
    ];
    $log = [];
    foreach ($lawIds as $lawId) {
      $key = $lawId;
      $args[$lawId] = LawCards::get($lawId)->getTitle();
      $args['i18n'][] = $key;
      $log[] = clienttranslate('${' . $key . '}');
    }

    Notifications::updateCompanyBalance($balance, clienttranslate('Company Balance increases by ${tkn_boldText_amount} (${sourceLog})'), [
      'tkn_boldText_amount' => '£' . $amount,
      'sourceLog' => [
        'log' => implode(' & ', $log),
        'args' => $args
      ]
    ]);
  }

  private function getWriterBonus()
  {
    return LawCards::isInPlay(WRITER_PRIVILEGES_ID) ? 2 : 1;
  }

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
