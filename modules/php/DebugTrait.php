<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\CompanyFailureCards;
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
use Bga\Games\JohnCompany\Managers\ControlTokens;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;
use Bga\Games\JohnCompany\Utils\TradeRoutes;

trait DebugTrait
{
  function setupItem($item, $families) {}

  function debug_test()
  {
    Offices::get(GOVERNOR_OF_BENGAL)->setFamilyMemberId(null);

    // LawCards::insertOnTop(GOVERNOR_GENERAL_LAW_ID, DECK);
    // $ship = Ships::getTopOf(Locations::supplyOtherShips());
    // $ship->place(Players::get(2371052), Locations::shipUnderConstruction(MADRAS), COMPANY_SHIP);
    // $familyMember = FamilyMembers::getTopOf(Locations::familyMemberSupply(HASTINGS));
    // $familyMember->setLocation(GOVERNOR_OF_BENGAL);

    // Offices::get(GOVERNOR_GENERAL)->setFamilyMemberId('familyMember_Hastings_11');
    // LawCards::get(DEREGULATION_ID)->setLocation(DEREGULATION_AVAILABLE);
    // CompanyFailureCards::get('CompanyFailureCard_02')->resolveEffect();

    // Company::setShareValue(1);
    // EventTiles::insertOnTop('EventTile_18', DISCARD);

    // $familyMembers = FamilyMembers::getMany(["familyMember_Walsh_1", "familyMember_Sykes_3"])->toArray();

    // $topOfDeck = EventTiles::getTopOf(DECK);
    // $regionName = $topOfDeck !== null ? Regions::get($topOfDeck->getRegionId())->getName() : null;
    // Notifications::log('debug', Company::get());


    // AtomicActions::get(EVENTS_IN_INDIA_STORMS)->rollForShips(ONE_ALL);
    // Offices::get(PRESIDENT_OF_MADRAS)->setLocation(Locations::vacantOffices());
    // $parliament = Globals::getParliament();
    // $parliament[OPPOSITION] = [
    //   'votes' => $parliament[OPPOSITION], // array of $playerId => votes
    //   'leader' => 2371053,
    // ];
    // Globals::setParliament($parliament);
    // $chairmanFamily = Families::getChairmanFamily();
    // $playerId = Players::getPlayerForFamily($chairmanFamily->getId());

    // Notifications::log('debug', ControlTokens::getByRegion(MADRAS));

    // Parliament::setSupport(-5);
    // $data = Globals::getParliament();
    // $data[OPPOSITION] = [];
    // Globals::setParliament($data);
    // Parliament::setVotesCastThisRound(5);
    // Parliament::incOppositionVotes(1,1);

    // Parliament::changePrimeMinister(SYKES);
    // Notifications::log('debug', Parliament::getPrimeMinisterPlayerId());

    // Regions::get(PUNJAB)->setUnrest(3);
    // Regions::get(MARATHA)->setUnrest(1);
    // Players::get(2371052)->getFamily()->updateOpportunityMarker(ENLIST_OFFICER);
    // Players::get(2371053)->getFamily()->updateOpportunityMarker(SEEK_SHARE);
    // Globals::setRetirementMoney([]);
    // Globals::setElephant([
    //   FACING => HYDERABAD,
    //   LOCATION => HYDERABAD_MADRAS_BORDER
    // ]);
    // Ships::get('Zenobia')->setSide(FATIGUED);
    // Enterprises::get('Workshop_2')->setInvested(1);
    // LondonSeasonCards::setupLoadBlackmailCards();
    // Notifications::log('tradeRoute', TradeRoutes::getOrdersForTradeRoute(ORDER_BOMBAY_3, 16));

    // Notifications::log('homePorts', Orders::getHomePorts());

  }

  function debug_addRegiment(string $presidencyId)
  {
    $regiment = ArmyPieces::getTopOf(Locations::supplyRegiments());

    $regiment->placeInArmy(Players::get(2371052), $presidencyId);
  }

  function debug_eventInIndia()
  {
    $ctx = Engine::getNextUnresolved();
    EventTiles::get('EventTile_18')->resolveEvent(BENGAL, $ctx);
    Engine::save();
    Engine::proceed();
  }

  function debug_londonSeasonCard(string $familyId, string $cardId)
  {
    $card = LondonSeasonCards::get($cardId);
    $card->setLocation(Locations::londonSeasonCards($familyId));
    Notifications::moveLondonSeasonCard(Families::get($familyId)->getPlayer(), $card, null);
  }

  function debug_putLawInPlay(string $lawId)
  {
    $law = LawCards::get($lawId);
    $law->setLocation(Locations::passedLaws());
    Notifications::moveLaws(Parliament::getPrimeMinisterPlayer(), [$law], null, null);
  }

  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }
}
