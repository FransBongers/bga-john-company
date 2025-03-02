<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class NewCompanyShares extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_NEW_COMPANY_SHARES;
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

  public function stNewCompanyShares()
  {
    $membersOnStockExchange = FamilyMembers::getOnStockExchange();
    $debt = Company::getDebt();
    $startingDebt = $debt;

    foreach (STOCK_EXCHANGE_POSITIONS as $position) {
      if ($debt === 0) {
        continue;
      }
      $familyMember = $this->findMemberInPosition($membersOnStockExchange, $position);
      if ($familyMember === null) {
        continue;
      }
      // FamilyMember and 
      $familyMember->setLocation(COURT_OF_DIRECTORS);
      $debt--;

      Notifications::newCompanyShare(Players::getPlayerForFamily($familyMember->getFamilyId()), $familyMember, $debt);
    }

    if ($debt !== $startingDebt) {
      Company::setDebt($debt);
    }

    $emptyPositions = [];

    $shiftedFamilyMembers = [];

    foreach (STOCK_EXCHANGE_POSITIONS as $position) {
      $familyMember = $this->findMemberInPosition($membersOnStockExchange, $position);
      if ($familyMember === null) {
        $emptyPositions[] = $position;
        continue;
      }
      if (count($emptyPositions) > 0) {
        $newPosition = array_shift($emptyPositions);
        $familyMember->setLocation($newPosition);
        $shiftedFamilyMembers[] = $familyMember;
      }
    }

    if (count($shiftedFamilyMembers) > 0) {
      Notifications::moveFamilyMembers($shiftedFamilyMembers);
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

  private function findMemberInPosition($membersOnStockExchange, $position)
  {
    return Utils::array_find($membersOnStockExchange, function ($member) use ($position) {
      return $member->getLocation() === $position;
    });
  }
}
