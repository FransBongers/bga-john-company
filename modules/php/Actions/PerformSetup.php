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
      foreach ($setupCards as $card) {
        $items = $card->getItems();
        Notifications::log('items', $items);

        foreach ($items as $item) {
          switch ($item['type']) {
            case OFFICE:
              FamilyMembers::getMemberFor($familyId)->setLocation($item['value']);
              if ($item['value'] === CHAIRMAN) {
                $families[$familyId]->setHasChairmanMarker(1);
              }
              break;
            case COMPANY_SHARE:
              FamilyMembers::getMemberFor($familyId)->setLocation(COURT_OF_DIRECTORS);
              break;
            case WRITER:
              FamilyMembers::getMemberFor($familyId)->setLocation(Locations::writers($item['value']));
              break;
            case OFFICER:
              FamilyMembers::getMemberFor($familyId)->setLocation(Locations::officers($item['value']));
              break;
            case COMMANDER:
              FamilyMembers::getMemberFor($familyId)->setLocation(Locations::commander($item['value']));
              break;
            case OFFICER_IN_TRAINING:
              FamilyMembers::getMemberFor($familyId)->setLocation(OFFICER_IN_TRAINING);
              break;
            case CASH:
              $families[$familyId]->incTreasury($item['value']);
              break;
          }
        }
      }
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
