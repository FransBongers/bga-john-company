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

    $this->resolveCrisisDefense($args, 0);


    Game::get()->gamestate->setPlayerNonMultiactive($args['actingCommanderId'], 'next');
    $this->resolveAction(['automatic' => true], true);
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

    $this->resolveCrisisDefense($stateArgs, $selectedStrength);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function resolveCrisisDefense(array $stateArgs, int $selectedStrength)
  {
    switch ($stateArgs['type']) {
      case INVASION_AGAINST_COMPANY:
        $this->resolveInvasionAgainstTheCompany(
          $stateArgs['attackerId'],
          $stateArgs['defenderId'],
          $stateArgs['attackerStrength'],
          $selectedStrength,
          $stateArgs['primaryCrisis'],
        );
        break;
      case REBELLION_AGAINST_COMPANY:
        $this->resolveRebellionAgainstTheCompany(
          $stateArgs['attackerId'],
          $stateArgs['attackerStrength'],
          $stateArgs['primaryCrisis'],
          $selectedStrength
        );
        break;
    }
  }

  private function resolveRebellionAgainstTheCompany(string $attackerId, int $attackerStrength, int $defenderStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];

    Notifications::crisisResult($attackerStrength, $defenderStrength, REBELLION_AGAINST_COMPANY);

    $attackSuccessful = $attackerStrength > $defenderStrength;

    if ($attackSuccessful) {
      $attacker->closeAllOrders();
      $this->performRegionLossSteps($attackerId, $attackerId, REBELLION_AGAINST_COMPANY);
    } else {
      $attacker->removeUnrest();
      $this->giveCommanderTrophy($attacker);
    }
    if ($primaryCrisis) {
      Elephant::insertMarchNode($this->ctx);
    }
    $this->insertAdditionalRebellionCrisisNodes($this->ctx, $attackerId);
  }

  private function resolveInvasionAgainstTheCompany(string $attackerId, string $defenderId, int $attackerStrength, int $defenderStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $defender = $regions[$defenderId];
    $attacker = $regions[$attackerId];

    Notifications::crisisResult($attackerStrength, $defenderStrength, INVASION_AGAINST_COMPANY);

    $attackSuccessful = $attackerStrength > $defenderStrength;

    if ($attackSuccessful) {
      $this->performRegionLossSteps($defenderId, $attackerId, INVASION_AGAINST_COMPANY);
      $this->placeFlagAndElephantMarch($attacker, $defender, $primaryCrisis);
    } else {
      $defender->removeUnrest();
      $this->giveCommanderTrophy($defender);
    }
    $this->insertAdditionalRebellionCrisisNodes($this->ctx, $defenderId);
  }

  public function giveCommanderTrophy(Region $region)
  {
    $presidencyId = $region->getControllingPresidencyId();
    $commander = FamilyMembers::getTopOf(Locations::commander($presidencyId));
    if ($commander !== null) {
      $family = $commander->getFamily();
      $family->gainTrophy();
    }
  }

  public function placeFlagAndElephantMarch(Region $attacker, Region $defender, bool $primaryCrisis)
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
    if ($primaryCrisis) {
      Elephant::insertMarchNode($this->ctx, $capitalRegionId);
    }
  }

  private function performRegionLossSteps(string $regionId, string $attackerId, string $type)
  {
    $regions = Regions::getAll();
    $region = $regions[$regionId];
    $attacker = $regions[$attackerId];

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
    if ($governorOffice->isInPlay()) {
      $governorOffice->eliminate();
    }
    $region->setControl(null);

    // Restore Local Authority
    $region->incTowerLevel(1);
    $region->removeUnrest();


    if ($type === INVASION_AGAINST_COMPANY) {
      $region->closeAllOrders();
    }

    // Company Humiliation
    Company::resolveCompanyHumiliation();
  }

  public static function insertAdditionalRebellionCrisisNodes($ctx, string $excludedRegionId)
  {
    $regionsByPresidency = [BOMBAY_PRESIDENCY => [], MADRAS_PRESIDENCY => [], BENGAL_PRESIDENCY => []];

    foreach (Regions::getAll() as $region) {
      if ($region->getId() === $excludedRegionId || !$region->isCompanyControlled() || $region->getUnrest() <= 0) {
        continue;
      }
      $regionsByPresidency[$region->getControllingPresidencyId()][] = $region;
    }

    $nodes = [];
    foreach ($regionsByPresidency as $regions) {
      if (count($regions) === 0) {
        continue;
      }
      $children = array_map(function ($region) {
        return [
          'action' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
          'args' => [
            'type' => REBELLION_AGAINST_COMPANY,
            'attackerId' => $region->getId(),
            'defenderId' => null,
            'eventTileStrength' => 0,
            'primaryCrisis' => false,
          ],
        ];
      }, $regions);

      $nodes[] = [
        'type' => NODE_OR,
        'playerId' => $regions[0]->getActingCommander()->getPlayerId(),
        'children' => $children,
        'requiredChoiceCount' => count($children),
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('${you} must choose where to resolve a rebellion next'),
          'description' => clienttranslate('${actplayer} must choose where to resolve a rebellion next'),
          'args' => []
        ],
      ];
    }

    if (count($nodes) === 0) {
      return;
    }

    // Single seq node keeps presidency order; repeated insertAsBrother would reverse it
    $ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_SEQ,
      'children' => $nodes,
    ]));
  }
}
