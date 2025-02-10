<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Scenarios;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\FamilyMember;

trait DebugTrait
{

  function debug_test()
  {
    Orders::get(ORDER_BENGAL_2)->setStatus(FILLED);
    // Orders::setupNewGame();
    // Notifications::log('familyMembers', FamilyMembers::getInLocationOrdered(Locations::familyMemberSupply(HASTINGS))->toArray());
    // Notifications::log('offices', Offices::getAll());
  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }
}
