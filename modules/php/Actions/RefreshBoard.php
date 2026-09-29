<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Player;

class RefreshBoard extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_REFRESH_BOARD;
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

  public function stRefreshBoard()
  {
    $this->returnWritersToAssociatedPresidencies();
    $this->openFilledOrders();
    $this->returnAllExtraShipsToTheSupply();
    $this->refreshArmies();

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function returnWritersToAssociatedPresidencies()
  {
    $writersToReturn = [];
    foreach (FamilyMembers::getAll() as $familyMember) {
      if (Utils::startsWith($familyMember->getLocation(), 'Order')) {
        $familyMember->setLocation(Locations::writers($familyMember->getPresidency()));
        $writersToReturn[] = $familyMember;
      }
    }
    Notifications::returnWritersToPresidencies($writersToReturn);
  }

  private function openFilledOrders()
  {
    foreach (Orders::getAll() as $order) {
      if (in_array($order->getStatus(), [FILLED, FILLED_BY_WRITER], true)) {
        $order->open(null, true);
      }
    }
  }

  private function returnAllExtraShipsToTheSupply()
  {
    $removedShips = [];
    foreach (Ships::getAll() as $ship) {
      if ($ship->getType() !== OTHER_SHIP || $ship->getSide() !== EXTRA_SHIP || $ship->getLocation() === Locations::supplyOtherShips()) {
        continue;
      }

      $ship->setLocation(Locations::supplyOtherShips());
      $removedShips[] = $ship;
    }
    Notifications::returnShipsToSupply($removedShips);
  }

  private function refreshArmies()
  {
    $movedArmyPieces = [];
    $movedOfficers = [];
    foreach (PRESIDENCIES as $presidencyId) {
      $readyLocation = Locations::armyOfReady($presidencyId);
      $exhaustedLocation = Locations::armyOfExhausted($presidencyId);

      foreach (FamilyMembers::getInLocation($exhaustedLocation) as $officer) {
        $officer->setLocation($readyLocation);
        $movedOfficers[] = $officer;
      }

      foreach (ArmyPieces::getInLocation($exhaustedLocation) as $piece) {
        if ($piece->getType() === REGIMENT) {
          $piece->setLocation($readyLocation);
          $movedArmyPieces[] = $piece;
        }
      }

      foreach (ArmyPieces::getInLocation($readyLocation) as $piece) {
        if ($piece->getType() === LOCAL_ALLIANCE) {
          $piece->setLocation($exhaustedLocation);
          $movedArmyPieces[] = $piece;
        }
      }
    }
    Notifications::refreshArmies($movedArmyPieces, $movedOfficers);
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('RefreshBoard');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
