<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class ResolveCrisis
{
  public static function resolveInvasion($regions, $attackerId, $defenderId, $eventTileStrength)
  {
    Notifications::crisis($regions[$attackerId]->getName(), $regions[$defenderId]->getName(), true);

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

  public static function resolveInvasionAgainstTheCompany($regions, $attackerId, $defenderId, $eventTileStrength)
  {
    Notifications::crisis($regions[$attackerId]->getName(), clienttranslate('the Company'), true);
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

  public static function resolveRebellionAgainstTheCompany($regions, $attackerId, $eventTileStrength)
  {
    Notifications::crisis($regions[$attackerId]->getName(), clienttranslate('the Company'), false);
    // TODO: rebellion against the company

    // Return if rebellion was successful
    return false;
  }

  public static function resolveRebellion($regions, $attackerId, $defenderId, $eventTileStrength)
  {
    Notifications::crisis($regions[$attackerId]->getName(), $regions[$defenderId]->getName(), false);

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
}
