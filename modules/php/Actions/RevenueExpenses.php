<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Ships;

use Bga\Games\JohnCompany\Models\SetupCard;

class RevenueExpenses extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_REVENUE_EXPENSES;
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


  public function stRevenueExpenses()
  {
    $totalExpenses = 0;

    $debt = Company::getDebt();
    $totalExpenses += $debt;

    $regiments = ArmyPieces::getRegimentsInArmies();
    $numberOfRegiments = count($regiments);
    $totalExpenses += $numberOfRegiments;

    $officers = FamilyMembers::getOfficers();
    $numberOfOfficers = count($officers);
    $totalExpenses += $numberOfOfficers;

    $ships = Ships::getShipsInSeaZones();
    $numberOfShips = count($ships);
    $totalExpenses += $numberOfShips;


    $companyBalance = Company::getBalance();

    $companyBalanceAfterExpenses = max(0, $companyBalance - $totalExpenses);
    Company::setBalance($companyBalanceAfterExpenses);

    Notifications::message(clienttranslate('The Company must pay total expenses of ${tkn_boldText_amount} ${tkn_pound}'), [
      'tkn_boldText_amount' => $totalExpenses,
      'tkn_pound' => Notifications::tknPound(),
    ]);
    Notifications::payCompanyExpenses($companyBalanceAfterExpenses);

    if ($totalExpenses > $companyBalance) {
      // TODO: check royal pardon
      $action = [
        'action' => REVENUE_EMERGENCY_LOANS,
        'remainingExpenses' => $totalExpenses - $companyBalance,
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

}
