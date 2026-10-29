<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Ships;

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
    if (LawCards::isInPlay(CALICO_ACTS_ID)) {
      $this->lowerCompanyBalance();
    }

    $totalExpenses = 0;

    $debt = Company::getDebt();
    $debtMultuplier = LawCards::isInPlay(COMPANY_AIDS_GOVERNMENT_ID) ? 2 : 1;
    $totalExpenses += $debt * $debtMultuplier;

    $costPerRegiment = LawCards::isInPlay(SEPOY_RECRUITMENT_ID) ? 0 : 1;

    $regiments = ArmyPieces::getRegimentsInArmies();
    $numberOfRegiments = count($regiments);
    $totalExpenses += $numberOfRegiments * $costPerRegiment;

    $officers = FamilyMembers::getOfficers();
    $numberOfOfficers = count($officers);
    $totalExpenses += $numberOfOfficers;

    $ships = Ships::getShipsInSeaZones();
    $numberOfShips = count($ships);
    $totalExpenses += $numberOfShips;


    $companyBalance = Company::getBalance();

    $companyBalanceAfterExpenses = max(0, $companyBalance - $totalExpenses);
    Company::setBalance($companyBalanceAfterExpenses);

    Notifications::message(clienttranslate('The Company must pay total expenses of ${tkn_boldText_amount}'), [
      'tkn_boldText_amount' => '£' . $totalExpenses,
      'tkn_pound' => Notifications::tknPound(),
    ]);
    Notifications::payCompanyExpenses($companyBalanceAfterExpenses);

    $remainingExpenses = $totalExpenses - $companyBalance;
    if ($remainingExpenses > 0) {
      $this->handleEmergencyLoans($remainingExpenses);
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

  private function lowerCompanyBalance()
  {
    $balance = Company::getBalance();
    $amount = (int) floor($balance / 7);

    $newBalance = Company::incBalance(-$amount);
    if ($balance === $newBalance) {
      return;
    }
    Notifications::updateCompanyBalance($newBalance, clienttranslate('${tkn_boldText_source}: Company Balance is lowered by £${tkn_boldText_amount}'), [
      'tkn_boldText_source' => clienttranslate('Calico Acts'),
      'tkn_boldText_amount' => '£' . $amount,
    ]);
  }

  private function handleEmergencyLoans(int $remainingExpenses)
  {

    $action = [];
    if (LawCards::isInPlay(ROYAL_PROTECTION_ID)) {
      $playerId = Players::getChairmanPlayerId();

      $action = [
        'type' => NODE_XOR,
        'playerId' => $playerId,
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('Royal Protection: ${you} may avoid emergency loans and cancel remaining expenses of ${amount}'),
          'description' => clienttranslate('Royal Protection: ${actplayer} may avoid emergency loans and cancel remaining expenses of ${amount}'),
          'args' => [
            'amount' => '£' . $remainingExpenses,
          ]
        ],
        'children' => [
          [
            'action' => USE_ROYAL_PROTECTION,
            'args' => [
              'option' => YES,
              'remainingExpenses' => $remainingExpenses,
            ],
          ],
          [
            'action' => USE_ROYAL_PROTECTION,
            'args' => [
              'option' => NO,
              'remainingExpenses' => $remainingExpenses,
            ],
          ],
        ],
      ];
    } else {
      $action = [
        'action' => REVENUE_EMERGENCY_LOANS,
        'args' => [
          'remainingExpenses' => $remainingExpenses,
        ]
      ];
    }

    $this->ctx->insertAsBrother(Engine::buildTree($action));
  }
}
