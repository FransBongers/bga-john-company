<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\SetupCards;

class PerformSetup extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PERFORM_SETUP;
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

  public function stPerformSetup()
  {
    $playersExtraData = PlayersExtra::getAll();
    $players = Players::getAll();
    $offices = Offices::getAll();

    foreach ($playersExtraData as $playerId => $playerData) {
      $setupCards = SetupCards::getInLocation(Locations::setupCards($playerId))->toArray();
      $player = $players[$playerId];
      Notifications::setupRevealCards($player, $setupCards);

      $familyMembers = [];
      $playerOffices = [];
      $cash = 0;
      $enterprises = [];
      $randomBlackMailCards = 0;
      $isPrimeMinister = false;

      foreach ($setupCards as $card) {
        $items = $card->getItems();

        foreach ($items as $item) {
          switch ($item['type']) {
            case OFFICE:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation($item['value']);
              $familyMembers[] = $familyMember;
              if ($item['value'] === CHAIRMAN) {
                $playersExtraData[$playerId]->setHasChairmanMarker(1);
              }
              $offices[$item['value']]->setFamilyMemberId($familyMember->getId());
              $offices[$item['value']]->setLocation(Locations::familyOffices($playerId));
              $playerOffices[] = $offices[$item['value']];
              break;
            case COMPANY_SHARE:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation(COURT_OF_DIRECTORS);
              $familyMembers[] = $familyMember;
              break;
            case WRITER:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation(Locations::writers($item['value']));
              $familyMember->setPresidency($item['value']);
              $familyMembers[] = $familyMember;
              break;
            case OFFICER:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation(Locations::armyOfReady($item['value']));
              $familyMember->setPresidency($item['value']);
              $familyMembers[] = $familyMember;
              break;
            case COMMANDER:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation(Locations::commander($item['value']));
              $familyMembers[] = $familyMember;
              break;
            case OFFICER_IN_TRAINING:
              $familyMember = FamilyMembers::getMemberFor($playerId);
              $familyMember->setLocation(OFFICER_IN_TRAINING);
              $familyMembers[] = $familyMember;
              break;
            case CASH:
              $playersExtraData[$playerId]->incTreasury($item['value']);
              $cash += $item['value'];
              break;
            case LUXURY;
            case SHIPYARD;
            case WORKSHOP;
              $enterprises[] = $item;
              break;
            case RANDOM_BLACKMAIL_CARD;
              $randomBlackMailCards++;
              break;
            case PRIME_MINISTER;
              $isPrimeMinister = true;
              break;
          }
        }
      }

      Notifications::setupFamilyMembers($player, $familyMembers);
      foreach ($playerOffices as $office) {
        Notifications::moveOfficeCard($office, '', []);
      }
      Notifications::updateFamilyTreasury($player, $cash);
      if ($isPrimeMinister) {
        Parliament::changePrimeMinister($playerId);
      }

      // Enterprises
      foreach ($enterprises as $item) {
        $type = $item['type'];

        $enterprise = Enterprises::getTopOf(Locations::supplyEnterprises($type));
        $enterprise->changeOwner($playerId);

        Notifications::gainEnterprise($player, $enterprise);

        if ($type === SHIPYARD && in_array($item['value'], SEA_ZONES)) {
          $ship = $enterprise->getShip();
          $ship->place($player, $item['value']);
        }
      }
      for ($i = 0; $i < $randomBlackMailCards; $i++) {
        $card = LondonSeasonCards::getTopOf(Locations::londonSeasonPool(BLACKMAIL));
        $card->take($player, $this->ctx);
      }
    }
    Notifications::updatePower();

    Notifications::setupDone();
    Globals::setTransactionsEnabled(true);
    $this->setupLondonSeasonDisplay();

    $this->resolveAction(['automatic' => true]);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function setupLondonSeasonDisplay()
  {
    LondonSeasonCards::setupLondonSeasonDisplay();
    Notifications::newLondonSeasonDisplay(LondonSeasonCards::getInLocationOrdered(Locations::londonSeasonDisplay())->toArray(), true);
  }
}
