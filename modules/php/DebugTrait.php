<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Scenarios;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Enterprise;
use Bga\Games\JohnCompany\Models\FamilyMember;

trait DebugTrait
{
  function setupItem($item, $families) {}


  function debug_setup()
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
  }

  function debug_test()
  {
    
    // Orders::get(ORDER_BENGAL_2)->setStatus(FILLED);
    // Orders::setupNewGame();
    // Notifications::log('familyMembers', FamilyMembers::getInLocationOrdered(Locations::familyMemberSupply(HASTINGS))->toArray());
    // Notifications::log('players', Players::getCrown());
    // Notifications::log('regions', Regions::getAll());
    Enterprises::setupNewGame();
  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }
}
