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

  private function handleEmergencyLoans(int $remainingExpenses)
  {

    $action = [
      'action' => REVENUE_EMERGENCY_LOANS,
      'remainingExpenses' => $remainingExpenses,
    ];
    if (LawCards::isInPlay(ROYAL_PROTECTION_ID)) {
      $playerId = Players::getChairmanPlayerId();

      $action = [
        'type' => NODE_XOR,
        'playerId' => $playerId,
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('${you} may discard Royal Protection to avoid emergency loans and cancel remaining expenses'),
          'description' => clienttranslate('${actplayer} may discard Royal Protection to avoid emergency loans and cancel remaining expenses'),
          'args' => []
        ],
        'children' => [
          [
            'action' => USE_ROYAL_PROTECTION,
            'args' => [
              'option' => YES,
            ],
          ],
          [
            'action' => USE_ROYAL_PROTECTION,
            'args' => [
              'option' => NO,
            ],
          ],
        ],
      ];
    }

    $this->ctx->insertAsBrother(Engine::buildTree($action));
  }
}
