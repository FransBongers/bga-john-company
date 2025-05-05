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
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;

trait DebugTrait
{
  function setupItem($item, $families) {}




  function debug_test()
  {
    $this->checkIfPlayerGainsPromiseCubeFromCrown();
    // Notifications::log('map', Families::getFamilyIdPlayerIdMap());
    // Notifications::log('defender', ResolveCrisis::getDefenderStrengthInvasion(Regions::getAll(), Regions::get(BENGAL)));
    // Regions::get(DELHI)->setControl(BENGAL_PRESIDENCY);
    // EventTiles::insertOnTop('EventTile_18', DECK);
    // EventTiles::insertOnTop('EventTile_14', DECK);
  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }
}
