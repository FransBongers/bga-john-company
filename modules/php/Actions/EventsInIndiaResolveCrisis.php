<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Collection;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\Region;

class EventsInIndiaResolveCrisis extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_EVENTS_IN_INDIA_RESOLVE_CRISIS;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##.....##.....##....##....######..
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

  public function stEventsInIndiaResolveCrisis()
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];
    $attackerId = $args['attackerId'];
    $defenderId = $args['defenderId'];
    $eventTileStrength = $args['eventTileStrength'];
    $primaryCrisis = $args['primaryCrisis'] ?? false;

    switch ($type) {
      case INVASION:
        $this->resolveInvasion($attackerId, $defenderId, $eventTileStrength);
        break;
      case INVASION_AGAINST_COMPANY:
        $this->resolveInvasionAgainstTheCompany($attackerId, $defenderId, $eventTileStrength, $primaryCrisis);
        break;
      case REBELLION:
        $this->resolveRebellion($attackerId, $defenderId, $eventTileStrength);
        break;
      case REBELLION_AGAINST_COMPANY:
        $this->resolveRebellionAgainstTheCompany($attackerId, $eventTileStrength, $primaryCrisis);
        break;
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

  public function resolveRebellion(string $attackerId, string $defenderId, int $eventTileStrength)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];
    $defender = $regions[$defenderId];

    Notifications::message(clienttranslate('${tkn_boldText_attacker} rebels against ${tkn_boldText_defender}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => $regions[$defenderId]->getName(),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender'],
    ]);

    $attackStrength = $regions[$attackerId]->getStrength() + $eventTileStrength;
    $defenderStrength = $regions[$defenderId]->getStrength();

    Notifications::crisisResult($attackStrength, $defenderStrength, REBELLION);

    $successfulRebellion = $attackStrength > $defenderStrength;

    if ($successfulRebellion) {
      $attacker->closeAllOrders();
      $attacker->becomeSovereign();
    } else {
      $defender->incTowerLevel(-1);
    }
    Elephant::insertMarchNode($this->ctx);
  }

  private function resolveInvasion(string $attackerId, string $defenderId, int $eventTileStrength)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];
    $defender = $regions[$defenderId];

    Notifications::message(clienttranslate('${tkn_boldText_attacker} invades ${tkn_boldText_defender}'), [
      'tkn_boldText_attacker' => $attacker->getName(),
      'tkn_boldText_defender' => $defender->getName(),
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender',],
    ]);

    // TO CHECK: I don't think it possible a non-capital region in an Empire performs an invasion?
    $attackStrength = $attacker->getStrength() + $eventTileStrength;
    // Add all tower levels in the attacking empire
    foreach ($regions as $region) {
      if ($region->getControl() === $attackerId) {
        $attackStrength += $region->getStrength();
      }
    }

    $defenderStrength = $this->getDefenderStrengthInvasion($regions, $defender);

    Notifications::crisisResult($attackStrength, $defenderStrength, INVASION);
    $successfulInvasion = $attackStrength > $defenderStrength;

    if ($successfulInvasion) {
      $this->handleSuccessfulInvasion($attacker, $defender);
      // Handle successful invasion logic here
    } else {
      // Handle failed invasion logic here
      $attacker->incTowerLevel(-1);
      Elephant::insertMarchNode($this->ctx);
    }
  }

  private function handleSuccessfulInvasion(Region $attacker, Region $defender)
  {
    $capitalRegionId = null;
    if ($defender->isCapital()) {
      $defender->shatterEmpire();
    }
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
    Elephant::insertMarchNode($this->ctx, $capitalRegionId);
  }

  public function getDefenderStrengthInvasion(Collection $regions, Region $defender)
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

  public function resolveInvasionAgainstTheCompany(string $attackerId, string $defenderId, int $eventTileStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];
    $defender = $regions[$defenderId];

    $attackStrength = $attacker->getStrength() + $eventTileStrength + $defender->getUnrest();
    // Add all tower levels in the attacking empire
    foreach ($regions as $region) {
      if ($region->getControl() === $attackerId) {
        $attackStrength += $region->getStrength();
      }
    }

    Notifications::message(clienttranslate('${tkn_boldText_attacker} invades ${tkn_boldText_defender} and attacks the ${tkn_boldText_company} with a strength of ${tkn_boldText_attackStrength}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_defender' => $regions[$defenderId]->getName(),
      'tkn_boldText_company' => clienttranslate('Company'),
      'tkn_boldText_attackStrength' => $attackStrength,
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender', 'tkn_boldText_company'],
    ]);

    $actingCommanderId = $defender->getActingCommander()->getPlayerId();

    $this->insertCrisisDefenseNode($attackerId, $defenderId, $actingCommanderId, $attackStrength, INVASION_AGAINST_COMPANY, $primaryCrisis);
  }

  public function resolveRebellionAgainstTheCompany(string $attackerId, int $eventTileStrength, bool $primaryCrisis)
  {
    $regions = Regions::getAll();
    $attacker = $regions[$attackerId];
    $attackStrength = $attacker->getUnrest() + $eventTileStrength;

    Notifications::message(clienttranslate('${tkn_boldText_attacker} rebels against the ${tkn_boldText_company} with a strength of ${tkn_boldText_attackStrength}'), [
      'tkn_boldText_attacker' => $regions[$attackerId]->getName(),
      'tkn_boldText_company' => clienttranslate('Company'),
      'tkn_boldText_attackStrength' => $attackStrength,
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_company', 'tkn_boldText_attackStrength'],
    ]);

    $actingCommanderId = $attacker->getActingCommander()->getPlayerId();

    self::insertCrisisDefenseNode($attackerId, $attackerId, $actingCommanderId, $attackStrength, REBELLION, $primaryCrisis);
  }

  public function insertCrisisDefenseNode(string $attackerId, string | null $defenderId, int $actingCommanderId, int $attackStrength, string $type, bool $primaryCrisis)
  {
    $action = [
      'action' => EVENTS_IN_INDIA_CRISIS_DEFENSE,
      'playerId' => 'some',
      'activePlayerIds' => [$actingCommanderId],
      'args' => [
        'attackerStrength' => $attackStrength,
        'attackerId' => $attackerId,
        'defenderId' => $defenderId,
        'type' => $type,
        'actingCommanderId' => $actingCommanderId,
        'primaryCrisis' => $primaryCrisis,
      ]
    ];

    $this->ctx->insertAsBrother(Engine::buildTree($action));
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];

    if ($type === REBELLION_AGAINST_COMPANY) {
      $regionId = $args['attackerId'];

      return Regions::get($regionId)->getName();
    }

    return clienttranslate('EventsInIndiaResolveCrisis');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
