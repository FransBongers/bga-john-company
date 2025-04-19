<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\AICards;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Scenarios;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Enterprise;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\AtomicActions;

trait DebugTrait
{
  function setupItem($item, $families) {}



  function debug_test()
  {
      // Company::setDebt(0);

    // Orders::get(ORDER_BENGAL_2)->setStatus(FILLED);
    // Orders::setupNewGame();
    // Notifications::log('familyMembers', FamilyMembers::getInLocationOrdered(Locations::familyMemberSupply(HASTINGS))->toArray());
    // Notifications::log('players', Players::getCrown());
    // Notifications::log('regions', Regions::getAll());
    // Enterprises::setupNewGame();
    // LondonSeasonCards::setupNewGame();
    // Notifications::log('memebers', FamilyMembers::getOnStockExchange());
    // AICards::setupNewGame();
    // Crown::drawCardAndSetClimate();
    // $presidencues = Offices::getMany([PRESIDENT_OF_MADRAS])->toArray();
    // Notifications::log('offices', Offices::getMany([DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING, PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY PRESIDENT_OF_BOMBAY]));
    // Offices::getMany([DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING, PRESIDENT_OF_BENGAL, PRESIDENT_OF_BOMBAY, PRESIDENT_OF_BOMBAY])

    // JoCoUtils::makeCheck(Players::get(), Offices::get(DIRECTOR_OF_TRADE), 1);
    // Notifications::log('regiments', ArmyPieces::getRegiments()->toArray());
    // ArmyPieces::get('Regiment_3')->setLocation(Locations::armyOf(BOMBAY));
    // ArmyPieces::get('Regiment_16')->setLocation(Locations::armyOf(BENGAL));
    // ArmyPieces::get('Regiment_6')->setLocation(Locations::armyOf(MADRAS));

    Notifications::log('callback', Globals::getCallbackEngineResolved());
    // Notifications::log('enterprises', Families::get(HASTINGS)->getEnterprises());
  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }
}
