<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\Region;

class ResolveCrisis
{
  public static function resolveInvasion($regions, $attackerId, $defenderId, $eventTileStrength)
  {
    Notifications::message(clienttranslate('${tkn_boldText_attacker} invades ${tkn_boldText_defender}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => $regions[$defenderId]->getName(),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender',],
    ]);

    // TO CHECK: I don't think it possible a non-capital region in an Empire performs an invasion?
    $attackStrength = $regions[$attackerId]->getStrength() + $eventTileStrength;
    // Add all tower levels in the attacking empire
    foreach ($regions as $region) {
      if ($region->getControl() === $attackerId) {
        $attackStrength += $region->getStrength();
      }
    }

    $defender = $regions[$defenderId];
    $defenderStrength = self::getDefenderStrengthInvasion($regions, $defender);

    Notifications::crisisResult($attackStrength, $defenderStrength);
    $successfulInvasion = $attackStrength > $defenderStrength;
    if ($successfulInvasion) {
      if ($defender->isCapital()) {
        $defender->shatterEmpire();
      }
      $isEmpire = $regions[$attackerId]->isCapital();
      if (!$isEmpire) {
        $isEmpire = $regions[$attackerId]->formEmpire();
      }
      if ($isEmpire) {
        $defender->becomePartOfEmpire($regions[$attackerId]);
      } else {
        $defender->becomeSovereign();
      }
    } else {
      $regions[$attackerId]->incTowerLevel(-1);
    }
    return $successfulInvasion;
  }

  public static function getDefenderStrengthInvasion($regions, $defender)
  {
    /**
     * Defender can either be:
     * - part of an empire, so control will be set to a regionId of capital
     * - the capital of an empire, other regions will have the regionId set as their control
     */
    $defenderStrength = 0;

    foreach ($regions as $region) {
      $regionIdToCheckFor = $defender->getControl() !== null ? $defender->getControl() : $defender->getId();
      if ($region->getControl() === $regionIdToCheckFor || $region->getId() === $regionIdToCheckFor) {
        $defenderStrength += $region->getStrength();
      }
    }

    return $defenderStrength;
  }

  public static function resolveInvasionAgainstTheCompany(array $regions, string $attackerId, string $defenderId, int $eventTileStrength)
  {
    Notifications::message(clienttranslate('${tkn_boldText_attacker} invades ${tkn_boldText_defender} and attacks the ${tkn_boldText_company}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => $regions[$defenderId]->getName(),
      'tkn_boldText_company' => clienttranslate('Company'),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender', 'tkn_boldText_company'],
    ]);

    $attacker = $regions[$attackerId];
    $defender = $regions[$defenderId];

    $attackStrength = $attacker->getStrength() + $eventTileStrength + $defender->getUnrest();
    // Add all tower levels in the attacking empire
    foreach ($regions as $region) {
      if ($region->getControl() === $attackerId) {
        $attackStrength += $region->getStrength();
      }
    }

    Notifications::message(clienttranslate('Attacker total is ${tkn_boldText_attackerTotal}'), [
      'tkn_boldText_attackerTotal' => $attackStrength
    ]);
    $action = [
      'action' => EVENTS_IN_INDIA_CRISIS_DEFENSE,
      'playerId' => 'some',
      'attackerStrength' => $attackStrength,
      'attackerId' => $attackerId,
      'defenderId' => $defenderId,
      'activePlayerIds' => [$defender->getActingCommander()->getPlayerId()],
    ];
    $node = Engine::getNextUnresolved();
    $node->insertAsBrother(Engine::buildTree($action));
  }

  public static function resolveRebellionAgainstTheCompany(array $regions, string $attackerId, int $eventTileStrength)
  {
    Notifications::message(clienttranslate('${tkn_boldText_attacker} rebels against the ${tkn_boldText_company}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => clienttranslate('Company'),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender'],
    ]);
    // TODO: rebellion against the company

    // Return if rebellion was successful
    return false;
  }

  public static function resolveRebellion(array $regions, string $attackerId, string $defenderId, int $eventTileStrength)
  {
    Notifications::message(clienttranslate('${tkn_boldText_attacker} rebels against ${tkn_boldText_defender}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => $regions[$defenderId]->getName(),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender'],
    ]);

    $attackStrength = $regions[$attackerId]->getStrength() + $eventTileStrength;
    $defenderStrength = $regions[$defenderId]->getStrength();

    Notifications::crisisResult($attackStrength, $defenderStrength);

    if ($attackStrength > $defenderStrength) {
      $attacker = $regions[$attackerId];
      $attacker->becomeSovereign();
      $attacker->closeAllOrders();
    } else {
      $regions[$defenderId]->incTowerLevel(-1);
    }

    Globals::setCascadedRegions([]);
    // return if rebellion was successful
    return $attackStrength > $defenderStrength;
  }

  public static function performRegionLossSteps(string $regionId, string $attackerId)
  {
    $regions = Regions::getAll();
    $region = $regions[$regionId];
    $attacker = $regions[$attackerId];

    $presidencyId = $region->getControllingPresidencyId();
    $commander = FamilyMembers::getTopOf(Locations::commander(PRESIDENCY_HOME_REGION_MAP[$presidencyId]));

    Notifications::message(clienttranslate('The ${tkn_boldText_company} loses control of ${tkn_boldText_region}'), [
      'tkn_boldText_region' => $region->getName(),
      'tkn_boldText_company' => clienttranslate('Company'),
      'i18n' => ['tkn_boldText_region', 'tkn_boldText_company'],
    ]);

    // Tarnish the Commander’s Name
    if ($commander !== null) {
      $family = $commander->getFamily();
      $commander->loseHalfTrophiesRoundedUp();
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
       

    $triggeredByInvastion = $attackerId !== $regionId;
    if ($triggeredByInvastion) {
      self::placeAppropriateFlag($attacker, $region);
      $region->closeAllOrders();
    }

    // Company Humiliation
    Company::resolveCompanyHumiliation();
  }

  public static function placeAppropriateFlag(Region $attacker, Region $defender)
  {
    if ($defender->isCapital()) {
      $defender->shatterEmpire();
    }
    $isEmpire = $attacker->isCapital();
    if (!$isEmpire) {
      $isEmpire = $attacker->formEmpire();
    }
    if ($isEmpire) {
      $defender->becomePartOfEmpire($attacker);
    } else {
      $defender->becomeSovereign();
    }
  }
}
