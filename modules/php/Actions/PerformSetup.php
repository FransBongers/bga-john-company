<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;

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

    foreach ($players as $player) {
      $setupCards = $player->getSetupCards();
      $familyId = $player->getFamilyId();

      Notifications::log('setupCards', $setupCards);
      $familyMembers = [];

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
              break;
            case COMPANY_SHARE:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(COURT_OF_DIRECTORS);
              $familyMembers[] = $familyMember;
              break;
            case WRITER:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(Locations::writers($item['value']));
              $familyMembers[] = $familyMember;
              break;
            case OFFICER:
              $familyMember = FamilyMembers::getMemberFor($familyId);
              $familyMember->setLocation(Locations::officers($item['value']));
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
              break;
          }
        }
      }

      Notifications::setupFamilyMembers($player, $familyMembers);
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
