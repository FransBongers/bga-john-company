<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\ControlTokens;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Models\Region;

class EventsInIndiaCrisisDefense extends ExhaustArmyPieces
{
  public function getState()
  {
    return ST_EVENTS_IN_INDIA_CRISIS_DEFENSE;
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


  public function stEventsInIndiaCrisisDefense()
  {
    $args = $this->argsEventsInIndiaCrisisDefense();

    if (!$args['skipOnEnteringState']) {
      return;
    }

    Notifications::message(clienttranslate('No ready pieces in the Army to mount a defense'), [
      'i18n' => [],
    ]);

    list($successful, $capitalRegionId) = $this->resolveCrisisDefense($args, 0);


    Game::get()->gamestate->setPlayerNonMultiactive($args['actingCommanderId'], 'next');
    $this->resolveAction([
      'automatic' => true,
      'successful' => $successful,
      'capitalRegionId' => $capitalRegionId,
    ], true);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsEventsInIndiaCrisisDefense()
  {
    $args = $this->ctx->getArgs();
    $defenderId = $args['defenderId']; // regionId?

    $region = Regions::get($defenderId);
    $presidencyId = $region->getControllingPresidencyId();

    $armyPieces = ArmyPieces::getInLocation(Locations::armyOfReady($presidencyId));
    $officers = FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId));

    $data = [
      'attackerStrength' => $args['attackerStrength'],
      'attackerId' => $args['attackerId'],
      'defenderId' => $args['defenderId'],
      'armyPieces' => $armyPieces,
      'officers' => $officers,
      'presidencyId' => $presidencyId,
      'skipOnEnteringState' => count($armyPieces) + count($officers) === 0,
      'actingCommanderId' => $args['actingCommanderId'],
      'type' => $args['type'],
      'primaryCrisis' => $args['primaryCrisis'] ?? false,
    ];
    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassEventsInIndiaCrisisDefense()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actEventsInIndiaCrisisDefense($args)
  {
    self::checkAction('actEventsInIndiaCrisisDefense');
    $playerId = $this->checkPlayer();

    $armyPieces = $args->armyPieces;
    $officers = $args->officers;
    $stateArgs = $this->argsEventsInIndiaCrisisDefense();

    list($selectedPieces, $selectedStrength) = $this->exhaustArmyPieces($stateArgs, $armyPieces, $officers);

    $player = Players::get($playerId);
    Notifications::exhaustPieces($player, $selectedPieces);

    list($successful, $capitalRegionId) = $this->resolveCrisisDefense($stateArgs, $selectedStrength);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([
      'successful' => $successful,
      'capitalRegionId' => $capitalRegionId,
      'primaryCrisis' => $stateArgs['primaryCrisis'],
    ], true);
  }




  private function resolveCrisisDefense(array $stateArgs, int $selectedStrength)
  {
    $successful = null;
    $capitalRegionId = null;
    switch ($stateArgs['type']) {
      case INVASION_AGAINST_COMPANY:
        list($successful, $capitalRegionId) = $this->resolveInvasionAgainstTheCompany(
          $stateArgs['attackerId'],
          $stateArgs['defenderId'],
          $stateArgs['attackerStrength'],
          $selectedStrength,
          $stateArgs['primaryCrisis'],
        );
        break;
      case REBELLION_AGAINST_COMPANY:
        $successful = $this->resolveRebellionAgainstTheCompany(
          $stateArgs['attackerId'],
          $stateArgs['attackerStrength'],
          $selectedStrength,
          $stateArgs['primaryCrisis'],
        );
        break;
      case FOREIGN_INVASION_AGAINST_COMPANY:
        $successful = $this->resolveForeignInvasionAgainstTheCompany(
          $stateArgs['defenderId'],
          $stateArgs['attackerStrength'],
          $selectedStrength,
          $stateArgs['primaryCrisis'],
        );
        break;
    }
    return [$successful, $capitalRegionId];
  }

  // .########..########.########..########.##.......##.......####..#######..##....##
  // .##.....##.##.......##.....##.##.......##.......##........##..##.....##.###...##
  // .##.....##.##.......##.....##.##.......##.......##........##..##.....##.####..##
  // .########..######...########..######...##.......##........##..##.....##.##.##.##
  // .##...##...##.......##.....##.##.......##.......##........##..##.....##.##..####
  // .##....##..##.......##.....##.##.......##.......##........##..##.....##.##...###
  // .##.....##.########.########..########.########.########.####..#######..##....##

  // ..######...#######..##.....##.########.....###....##....##.##....##
  // .##....##.##.....##.###...###.##.....##...##.##...###...##..##..##.
  // .##.......##.....##.####.####.##.....##..##...##..####..##...####..
  // .##.......##.....##.##.###.##.########..##.....##.##.##.##....##...
  // .##.......##.....##.##.....##.##........#########.##..####....##...
  // .##....##.##.....##.##.....##.##........##.....##.##...###....##...
  // ..######...#######..##.....##.##........##.....##.##....##....##...

  private function resolveRebellionAgainstTheCompany(string $attackerId, int $attackerStrength, int $defenderStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];

    Notifications::crisisResult($attackerStrength, $defenderStrength, REBELLION_AGAINST_COMPANY);

    $attackSuccessful = $attackerStrength > $defenderStrength;

    if ($attackSuccessful) {
      $attacker->closeAllOrders();
      $this->performRegionLossSteps($attackerId, 1, REBELLION_AGAINST_COMPANY);
    } else {
      $attacker->removeUnrest();
      $this->giveCommanderTrophy($attacker);
    }

    return $attackSuccessful;
    // if ($primaryCrisis) {
    //   Elephant::insertMarchNode($this->ctx);
    // }
    // $this->insertAdditionalRebellionCrisisNodes($this->ctx, $attackerId);
  }

  // .########..#######..########..########.####..######...##....##
  // .##.......##.....##.##.....##.##........##..##....##..###...##
  // .##.......##.....##.##.....##.##........##..##........####..##
  // .######...##.....##.########..######....##..##...####.##.##.##
  // .##.......##.....##.##...##...##........##..##....##..##..####
  // .##.......##.....##.##....##..##........##..##....##..##...###
  // .##........#######..##.....##.########.####..######...##....##

  // .####.##....##.##.....##....###.....######..####..#######..##....##
  // ..##..###...##.##.....##...##.##...##....##..##..##.....##.###...##
  // ..##..####..##.##.....##..##...##..##........##..##.....##.####..##
  // ..##..##.##.##.##.....##.##.....##..######...##..##.....##.##.##.##
  // ..##..##..####..##...##..#########.......##..##..##.....##.##..####
  // ..##..##...###...##.##...##.....##.##....##..##..##.....##.##...###
  // .####.##....##....###....##.....##..######..####..#######..##....##

  // ..######...#######..##.....##.########.....###....##....##.##....##
  // .##....##.##.....##.###...###.##.....##...##.##...###...##..##..##.
  // .##.......##.....##.####.####.##.....##..##...##..####..##...####..
  // .##.......##.....##.##.###.##.########..##.....##.##.##.##....##...
  // .##.......##.....##.##.....##.##........#########.##..####....##...
  // .##....##.##.....##.##.....##.##........##.....##.##...###....##...
  // ..######...#######..##.....##.##........##.....##.##....##....##...

  private function resolveForeignInvasionAgainstTheCompany(string $defenderId, int $attackerStrength, int $defenderStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $defender = $regions[$defenderId];

    $attackSuccessful = $attackerStrength > $defenderStrength;
    $dieRoll = $attackerStrength - $defender->getUnrest();

    Notifications::crisisResult($attackerStrength, $defenderStrength, FOREIGN_INVASION_AGAINST_COMPANY);

    if (!$attackSuccessful) {
      $this->giveCommanderTrophy($defender);
      return false;
    }

    $defender->closeAllOrders();

    $this->performRegionLossSteps($defenderId, floor($dieRoll / 2), FOREIGN_INVASION_AGAINST_COMPANY);
    return true;
  }



  // .####.##....##.##.....##....###.....######..####..#######..##....##
  // ..##..###...##.##.....##...##.##...##....##..##..##.....##.###...##
  // ..##..####..##.##.....##..##...##..##........##..##.....##.####..##
  // ..##..##.##.##.##.....##.##.....##..######...##..##.....##.##.##.##
  // ..##..##..####..##...##..#########.......##..##..##.....##.##..####
  // ..##..##...###...##.##...##.....##.##....##..##..##.....##.##...###
  // .####.##....##....###....##.....##..######..####..#######..##....##

  // ..######...#######..##.....##.########.....###....##....##.##....##
  // .##....##.##.....##.###...###.##.....##...##.##...###...##..##..##.
  // .##.......##.....##.####.####.##.....##..##...##..####..##...####..
  // .##.......##.....##.##.###.##.########..##.....##.##.##.##....##...
  // .##.......##.....##.##.....##.##........#########.##..####....##...
  // .##....##.##.....##.##.....##.##........##.....##.##...###....##...
  // ..######...#######..##.....##.##........##.....##.##....##....##...

  private function resolveInvasionAgainstTheCompany(string $attackerId, string $defenderId, int $attackerStrength, int $defenderStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $defender = $regions[$defenderId];
    $attacker = $regions[$attackerId];

    Notifications::crisisResult($attackerStrength, $defenderStrength, INVASION_AGAINST_COMPANY);

    $attackSuccessful = $attackerStrength > $defenderStrength;
    $capitalRegionId = null;

    if ($attackSuccessful) {
      $this->performRegionLossSteps($defenderId, 1, INVASION_AGAINST_COMPANY);
      $capitalRegionId = $this->placeFlag($attacker, $defender);
    } else {
      $defender->removeUnrest();
      $this->giveCommanderTrophy($defender);
    }
    // $this->insertAdditionalRebellionCrisisNodes($this->ctx, $defenderId);
    return [$attackSuccessful, $capitalRegionId];
  }

  public function giveCommanderTrophy(Region $region)
  {
    $presidencyId = $region->getControllingPresidencyId();
    $commander = FamilyMembers::getTopOf(Locations::commander($presidencyId));
    if ($commander !== null) {
      $family = $commander->getFamily();
      $family->gainTrophies(1);
    }
  }

  public function placeFlag(Region $attacker, Region $defender)
  {
    $capitalRegionId = null;
    $isEmpire = $attacker->isCapital();
    if (!$isEmpire) {
      $isEmpire = $attacker->formEmpire();
    }
    if ($isEmpire) {
      $defender->becomePartOfEmpire($attacker);
      $capitalRegionId = $attacker->getId();
    } else {
      $defender->becomeSovereign();
    }
    return $capitalRegionId;
  }

  private function performRegionLossSteps(string $regionId, int $towerLevel, string $type)
  {
    $regions = Regions::getAll();
    $region = $regions[$regionId];

    $presidencyId = $region->getControllingPresidencyId();
    $commander = FamilyMembers::getTopOf(Locations::commander($presidencyId));

    Notifications::message(clienttranslate('The ${tkn_boldText_company} loses control of ${tkn_boldText_region}'), [
      'tkn_boldText_region' => $region->getName(),
      'tkn_boldText_company' => clienttranslate('Company'),
      'i18n' => ['tkn_boldText_region', 'tkn_boldText_company'],
    ]);

    // Tarnish the Commander’s Name
    if ($commander !== null) {
      $family = $commander->getFamily();
      $family->loseHalfTrophiesRoundedUp();
      $commander->returnToSupply();
    }

    // Officer Rout
    $officers = array_merge(
      FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId))->toArray(),
      FamilyMembers::getInLocation(Locations::armyOfExhausted($presidencyId))->toArray(),
    );
    foreach ($officers as $officer) {
      $officer->checkForLosses(OFFICER_ROUT);
    }

    // Governor position is eliminated
    $governorOffice = Offices::get($region->getGovernorOfficeId());
    if ($governorOffice->isInPlay() && !Offices::get(GOVERNOR_GENERAL)->isInPlay()) {
      $governorOffice->eliminate();
    }
    $region->setControl(null);
    ControlTokens::get('ControlToken_' . $region->getId())->setLocation($region->getId());

    // Restore Local Authority
    $region->incTowerLevel($towerLevel);
    $region->removeUnrest();


    if ($type === INVASION_AGAINST_COMPANY) {
      $region->closeAllOrders();
    }

    // Company Humiliation
    Company::resolveCompanyHumiliation();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
