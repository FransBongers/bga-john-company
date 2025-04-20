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

class RevenuePayDividends extends \Bga\Games\JohnCompany\Actions\PresidencyActions
{
  public function getState()
  {
    return ST_REVENUE_PAY_DIVIDENDS;
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


  public function stRevenuePayDividends()
  {
    $shares = Company::getShares();
    $balance = Company::getBalance();
    // Notifications::log('numberOfShares',count($shares));
    if ($balance < count($shares)) {
      Notifications::message(clienttranslate('Not possible to pay dividends'), []);
      Game::get()->gamestate->setAllPlayersNonMultiactive('next');
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsRevenuePayDividends()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $shares = Company::getShares();
    $balance = Company::getBalance();
    $costPerDividend = count($shares);

    $maxNumberOfDividends = floor($balance / $costPerDividend);

    $data = [
      'activePlayerIds' => [$activePlayerId],
      'costPerDividend' => $costPerDividend,
      'maxNumberOfDividends' => $maxNumberOfDividends,
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

  public function actPassRevenuePayDividends()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actRevenuePayDividends($args)
  {
    self::checkAction('actRevenuePayDividends');
    $playerId = $this->checkPlayer();
    $numberOfDividends = $args->numberOfDividends;

    $player = Players::get($playerId);

    if ($numberOfDividends === 0) {
      Notifications::message(clienttranslate('${player_name} does not pay any dividends'), ['player' => $player]);
      Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
      $this->resolveAction([], true);
      return;
    }

    $stateArgs = $this->argsRevenuePayDividends();

    $shares = Company::getShares();

    if ($numberOfDividends < 0) {
      throw new \feException("ERROR_032");
    }

    if ($numberOfDividends > $stateArgs['maxNumberOfDividends']) {
      throw new \feException("ERROR_033");
    }

    $totalCost = count($shares) * $numberOfDividends;
    $companyBalance = Company::incBalance(-$totalCost);

    Notifications::payDividends($player, $numberOfDividends, $companyBalance, $totalCost);

    $dividendGainPerFamily = [];

    foreach ($shares as $familyMember) {
      $familyId = $familyMember->getFamilyId();
      if (isset($dividendGainPerFamily[$familyId])) {
        $dividendGainPerFamily[$familyId] += $numberOfDividends;
      } else {
        $dividendGainPerFamily[$familyId] = $numberOfDividends;
      }
    };

    $families = Families::getAll();

    foreach ($dividendGainPerFamily as $familyId => $amount) {
      $families[$familyId]->gainCash($amount);
    }

    $standing = Company::getStanding();
    if ($totalCost > $standing) {
      Company::adjustStanding(1);
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


}
