<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
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
    $families = Families::getAll();
    $players = Players::getAll();
    $offices = Offices::getAll();

    foreach ($families as $familyId => $family) {
      $setupCards = SetupCards::getInLocation(Locations::setupCards($familyId))->toArray();
      // $familyId = $player->getFamilyId();
      $player = $family->getPlayer();
      Notifications::setupRevealCards($player, $setupCards);

      $familyMembers = [];
      $cash = 0;
      $enterprises = [];
      $randomBlackMailCards = 0;
      $isPrimeMinister = false;

      foreach ($setupCards as $card) {
        $items = $card->getItems();
        Notifications::log('items', $items);

        foreach ($items as $item) {
          switch ($item['type']) {
            case OFFICE:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation($item['value']);
              $familyMembers[] = $familyMember;
              if ($item['value'] === CHAIRMAN) {
                $families[$familyId]->setHasChairmanMarker(1);
              }
              $offices[$item['value']]->setFamilyMemberId($familyMember->getId());
              break;
            case COMPANY_SHARE:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(COURT_OF_DIRECTORS);
              $familyMembers[] = $familyMember;
              break;
            case WRITER:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(Locations::writers($item['value']));
              $familyMember->setPresidency(Locations::presidency($item['value']));
              $familyMembers[] = $familyMember;
              break;
            case OFFICER:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(Locations::armyOf($item['value']));
              $familyMember->setPresidency(Locations::presidency($item['value']));
              $familyMembers[] = $familyMember;
              break;
            case COMMANDER:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(Locations::commander($item['value']));
              $familyMembers[] = $familyMember;
              break;
            case OFFICER_IN_TRAINING:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(OFFICER_IN_TRAINING);
              $familyMembers[] = $familyMember;
              break;
            case CASH:
              $families[$familyId]->incTreasury($item['value']);
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
      Notifications::gainCash($player, $cash);
      if ($isPrimeMinister) {
        // TODO: assign
      }

      // Enterprises
      foreach ($enterprises as $item) {
        $type = $item['type'];

        $enterprise = Enterprises::getTopOf(Locations::supplyEnterprises($type));
        $enterprise->changeOwner($familyId);

        Notifications::gainEnterprise($player, $enterprise);

        if ($type === SHIPYARD && in_array($item['value'], SEA_ZONES)) {
          $ship = $enterprise->getShip();
          $ship->place($player, $item['value']);
        }
      }
      // Random Blackmail card

    }

    Notifications::setupDone();

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
