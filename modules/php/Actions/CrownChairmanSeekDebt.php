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

class CrownChairmanSeekDebt extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_CHAIRMAN_SEEK_DEBT;
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

  public function stCrownChairmanSeekDebt()
  {
    Crown::drawCardAndSetClimate();

    $currentDebt = Company::getDebt();

    $crownPlayer = Crown::getPlayer();

    if ($currentDebt === MAX_DEBT) {
      Notifications::message(clienttranslate('${player_name} cannot seek extra Debt'), [
        'player' => $crownPlayer
      ]);
      $this->resolveAction(['automatic' => true]);
      return;
    }

    $numberOfAdvancements = $this->getDebtMarkerAdvancement();

    $newDebt = min($currentDebt + $numberOfAdvancements, MAX_DEBT);

    if ($currentDebt === $newDebt) {
      Notifications::message(clienttranslate('${player_name} does not want to advance the Debt marker'), [
        'player' => $crownPlayer
      ]);
    } else {
      Notifications::message(clienttranslate(_('${player_name} wants to increase Company Debt to ${tkn_boldText_debtValue}'),), [
        'player' => $crownPlayer,
        'tkn_boldText_debtValue' => $newDebt
      ]);
    }
    $action = [
      'action' => CROWN_CHAIRMAN_REQUEST_DEBT_ADVANCEMENT,
      'playerId' => 'some',
      'activePlayerIds' => Players::getNonCrownPlayerIds(),
      'currentDebt' => $currentDebt,
      'newDebt' => $newDebt, 
    ];
    $this->ctx->insertAsBrother(Engine::buildTree($action));

    $this->resolveAction(['automatic' => true]);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getDebtMarkerAdvancement()
  {
    $climate = Crown::getClimate();
    switch ($climate) {
      case BULL:
      case STAG:
        return count(Utils::filter(Orders::getHomePorts(), function ($order) {
          return !$order->isClosed();
        }));
      case LION:
        return $this->countSeaZonesWithLessThanTwoShips();
      case BEAR:
        return 0;
        break;
      case PEACOCK:
        return 0;
      default:
        throw new \feException("ERROR_039");
    }
  }

  private function countSeaZonesWithLessThanTwoShips()
  {
    $shipCount = [
      WEST_INDIAN => 0,
      EAST_INDIAN => 0,
      SOUTH_INDIAN => 0,
    ];

    $shipsInSeaZones = Ships::getShipsInSeaZones();
    foreach ($shipsInSeaZones as $ship) {
      $shipCount[$ship->getLocation()] += 1;
    }

    return count(Utils::filter(array_values($shipCount), function ($count) {
      return $count <= 2;
    }));
  }
}
