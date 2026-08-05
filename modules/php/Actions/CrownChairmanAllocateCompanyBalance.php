<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PrimeMinister;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;

class CrownChairmanAllocateCompanyBalance extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_CHAIRMAN_ALLOCATE_COMPANY_BALANCE;
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

  public function stCrownChairmanAllocateCompanyBalance()
  {
    if (Company::getBalance() === 0) {
      Notifications::message(clienttranslate('No Company Balance left to allocate'), []);
      $this->resolveAction(['automatic' => true]);
      return;
    }

    $info = $this->ctx->getInfo();
    $allocationStep = $info['allocationStep'];

    $allocation = $this->allocateNextStep($allocationStep);

    Notifications::log('allocationStep', $allocationStep);
    Notifications::log('allocation', $allocation);

    $crownPlayer = Crown::getPlayer();

    foreach ($allocation as $data) {
      $office = $data['office'];
      $amount = $data['amount'];

      $balance = Company::incBalance(-$amount);
      $treasury = $office->incTreasury($amount);

      Notifications::allocateBalanceToOffice($crownPlayer, $office, $amount, $balance, $treasury);
    }

    if (Company::getBalance() > 0) {
      $action = [
        'action' => CROWN_CHAIRMAN_ALLOCATE_COMPANY_BALANCE,
        'allocationStep' => $allocationStep + 1,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));

      $actionRequest = [
        'action' => CROWN_CHAIRMAN_REQUEST_ALLOCATION,
        'playerId' => 'some',
        'activePlayerIds' => Players::getNonCrownPlayerIds(),
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($actionRequest));
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

  private function allocateRemainingToManagerOfShipping()
  {
    $balance = Company::getBalance();
    return [
      [
        'office' => Offices::get(MANAGER_OF_SHIPPING),
        'amount' => $balance,
      ]
    ];
  }

  private function allocateBullClimate($step)
  {
    switch ($step) {
      case 1:
        return [];
        break;
      case 2:
        return [];
        break;
      default:
        return $this->allocateRemainingToManagerOfShipping();
    }
  }

  private function allocateStagClimate($step)
  {
    switch ($step) {
      case 1:
        return [];
        break;
      case 2:
        return [];
        break;
      case 3:
        return [];
        break;
      default:
        return $this->allocateRemainingToManagerOfShipping();
    }
  }

  private function allocateBearClimate($step)
  {
    switch ($step) {
      case 1:
        return [];
        break;
      case 2:
        return [];
        break;
      case 3:
        return [];
        break;
      case 4:
        return [];
        break;
      default:
        return $this->allocateRemainingToManagerOfShipping();
    }
  }

  private function allocateLionClimate($step)
  {
    switch ($step) {
      case 1:
        return [];
      case 2:
        return [];
      case 3:
        return [];
        break;
      case 4:
        return [];
        break;
      default:
        return $this->allocateRemainingToManagerOfShipping();
    }
  }

  private function allocatePeacockClimate($step)
  {
    switch ($step) {
      case 1:
        return [];
        break;
      case 2:
        return [];
        break;
      case 3:
        return [];
        break;
      default:
        return $this->allocateRemainingToManagerOfShipping();
    }
  }

  private function allocateNextStep($step)
  {
    $climate = Crown::getClimate();

    switch ($climate) {
      case BULL:
        return $this->allocateBullClimate($step);
      case STAG:
        return $this->allocateStagClimate($step);
      case LION:
        return $this->allocateLionClimate($step);
      case BEAR:
        return $this->allocateBearClimate($step);
      case PEACOCK:
        return $this->allocatePeacockClimate($step);
      default:
        throw new \feException("ERROR_047");
    }
  }
}
