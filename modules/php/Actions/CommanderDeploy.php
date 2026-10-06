<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\Region;

class CommanderDeploy extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_COMMANDER_DEPLOY;
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


  public function stCommanderDeploy()
  {
    $stateArgs = $this->argsCommanderDeploy();
    if ($stateArgs['skipOnEnteringState']) {
      $args = $this->ctx->getArgs();
      if ($args['first'] ?? false) {
        Notifications::message('${player_name} cannot perform a Deploy action', [
          'player' => Players::get($args['commanderPlayerId'])
        ]);
      }
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsCommanderDeploy()
  {
    $args = $this->ctx->getArgs();

    $presidentOfficeId = $args['presidentOfficeId'];
    $president = Offices::get($presidentOfficeId);
    $homeRegionId = $president->getRegionId();
    $presidencyId = $president->getPresidencyId();

    $options = $this->getOptions();

    return [
      'options' => $options,
      'skipOnEnteringState' => count($options) === 0,
      'armyPieces' => ArmyPieces::getInLocation(Locations::armyOfReady($presidencyId)),
      'officers' => FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId)),
      'regionId' => $homeRegionId,
      'presidencyId' => $presidencyId,
    ];
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

  public function actPassCommanderDeploy()
  {
    $playerId = $this->checkPlayer();
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
  }

  public function actCommanderDeploy($args)
  {
    self::checkAction('actCommanderDeploy');
    $playerId = $this->checkPlayer();

    $regionId = $args->regionId;
    $armyPieces = $args->armyPieces;
    $officers = $args->officers;

    $this->insertState();

    $stateArgs = $this->argsCommanderDeploy();

    if (!isset($stateArgs['options'][$regionId])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_049");
    }

    $selectedPieces = [];
    $selectedStrength = 0;

    foreach ($armyPieces as $pieceId) {
      if (!isset($stateArgs['armyPieces'][$pieceId])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_050");
      }
      $piece = $stateArgs['armyPieces'][$pieceId];
      $piece->setLocation(Locations::armyOfExhausted($stateArgs['presidencyId']));
      $selectedStrength += $piece->getStrength();
      $selectedPieces[] = $piece;
    }

    foreach ($officers as $pieceId) {
      if (!isset($stateArgs['officers'][$pieceId])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_051");
      }
      $officer = $stateArgs['officers'][$pieceId];
      $officer->setLocation(Locations::armyOfExhausted($stateArgs['presidencyId']));
      $selectedStrength++;
      $selectedPieces[] = $officer;
    }
    $player = Players::get($playerId);

    Notifications::deployPieces($player, $selectedPieces, $regionId);
    $numberOfDice = $selectedStrength - $stateArgs['options'][$regionId];
    if ($numberOfDice <= 0) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_052");
    }

    $familyMember = FamilyMembers::getInLocation(Locations::commander($stateArgs['regionId']))->toArray()[0];
    $checkResult = JoCoUtils::makeCheck($player, $numberOfDice, $familyMember);

    $survivingPieces = $this->checkForLosses($selectedPieces);

    $this->resolveCheck($player, $checkResult, $survivingPieces, $regionId, $stateArgs['presidencyId']);



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

  private function checkForLosses(array $pieces)
  {
    $survivingPieces = [];
    foreach ($pieces as $piece) {
      if ($piece->getType() !== FAMILY_MEMBER) {
        $survivingPieces[] = $piece;
        continue;
      }
      $checkForLossesResult = $piece->checkForLosses();
      if (!$checkForLossesResult) {
        $survivingPieces[] = $piece;
      }
    }
    return $survivingPieces;
  }

  private function resolveCheck(Player $player, string $checkResult, array $pieces, string $regionId, string $presidencyId)
  {
    if ($checkResult === FAILURE) {
      return;
    }
    if ($checkResult === CATASTROPHIC_FAILURE) {
      // handle;
      return;
    }
    $region = Regions::get($regionId);

    // Success
    $this->distributeLoot($region, $pieces, $player->getId());

    // Gain trophies for the surviving pieces
    $player->getFamily()->gainTrophies($region->getStrength());

    // Gain control of region
    $region->companyGainsControl($player, $presidencyId);

    // Redirect elephant
    Elephant::checkRedirect($regionId);
  }

  /**
   * Computes the loot for the region and distributes it: the Commander takes
   * their share and pays their officers, then clockwise players are paid for
   * their officers, then remaining cash goes to the bank per regiment/local
   * alliance, repeating until the loot is exhausted.
   *
   * @return array Map of playerId (or 'bank') => cash received
   */
  private function distributeLoot($region, $pieces, $commanderPlayerId)
  {

    $wasLooted = $region->isLooted();

    $officers = Utils::filter($pieces, function ($piece) {
      return $piece->getType() === FAMILY_MEMBER;
    });

    $lootValue = $wasLooted ? 0 : $region->getLoot();
    $loot = max(4 * $region->getStrength() + $lootValue, count($officers) + 1);

    Notifications::message(clienttranslate('Total loot is ${tkn_boldText_loot}'), [
      'tkn_boldText_loot' => '£' . $loot,
    ]);

    if (!$wasLooted) {
      $region->setLooted(true);
    }

    $officerCountByPlayerId = [];
    foreach ($officers as $officer) {
      $playerId = $officer->getPlayerId();
      $officerCountByPlayerId[$playerId] = ($officerCountByPlayerId[$playerId] ?? 0) + 1;
    }
    $armyPieceCount = count($pieces) - count($officers);

    $recipients = [
      ['id' => $commanderPlayerId, 'amount' => 1 + ($officerCountByPlayerId[$commanderPlayerId] ?? 0)],
    ];
    $turnOrderStartingFromCommander = Players::getTurnOrder($commanderPlayerId);
    foreach ($turnOrderStartingFromCommander as $playerId) {
      if ($playerId === $commanderPlayerId || !isset($officerCountByPlayerId[$playerId])) {
        continue;
      }
      $recipients[] = ['id' => $playerId, 'amount' => $officerCountByPlayerId[$playerId]];
    }
    if ($armyPieceCount > 0) {
      $recipients[] = ['id' => 'bank', 'amount' => $armyPieceCount];
    }

    $distribution = [];
    $remaining = $loot;
    while ($remaining > 0) {
      foreach ($recipients as $recipient) {
        if ($remaining <= 0) {
          break;
        }
        $amount = min($recipient['amount'], $remaining);
        $distribution[$recipient['id']] = ($distribution[$recipient['id']] ?? 0) + $amount;
        $remaining -= $amount;
      }
    }


    foreach ($turnOrderStartingFromCommander as $playerId) {
      if (isset($distribution[$playerId])) {
        Players::get($playerId)->getFamily()->gainCash($distribution[$playerId]);
      }
    }
    if (isset($distribution['bank'])) {
      Notifications::message(clienttranslate('The bank receives ${tkn_boldText_amount}'), [
        'tkn_boldText_amount' => '£' . $distribution['bank']
      ]);
    }
  }

  /**
   * Returns a map of regionId => minimum strength required to deploy there.
   *
   * Valid targets are the President's home region, any region controlled by
   * their Presidency, or a region bordering one of those regions. Other
   * Presidents' home regions and regions Company-controlled by another
   * Presidency are never valid targets.
   */
  private function getOptions()
  {
    $args = $this->ctx->getArgs();

    $presidentOfficeId = $args['presidentOfficeId'];
    $president = Offices::get($presidentOfficeId);
    $homeRegionId = $president->getRegionId();
    $presidencyId = $president->getPresidencyId();

    $regionsById = Regions::getAll();
    $availableStrength = $this->getAvailableStrength($presidencyId);

    $associatedRegionIds = Utils::filter(REGIONS, function ($regionId) use ($regionsById, $presidencyId, $homeRegionId) {
      return $regionsById[$regionId]->getControl() === $presidencyId;
    });

    $candidateRegionIds = $associatedRegionIds;
    foreach ($associatedRegionIds as $regionId) {
      foreach ($regionsById[$regionId]->getAdjacentRegionIds() as $adjacentRegionId) {
        if (!in_array($adjacentRegionId, $candidateRegionIds)) {
          $candidateRegionIds[] = $adjacentRegionId;
        }
      }
    }
    if (!in_array($homeRegionId, $candidateRegionIds)) {
      $candidateRegionIds[] = $homeRegionId;
    }

    $options = [];
    foreach ($candidateRegionIds as $regionId) {
      $region = $regionsById[$regionId];

      if (in_array($regionId, HOME_REGIONS) && $regionId !== $homeRegionId) {
        // Another President's home region can never be targeted
        continue;
      }

      if ($region->isCompanyControlled() && $region->getControl() !== $presidencyId) {
        // Company-controlled region associated with another Presidency
        continue;
      }

      if ($region->isCompanyControlled()) {
        if ($region->getUnrest() === 0) {
          continue;
        }
        $regionStrength = 0;
      } else {
        $regionStrength = $this->getRegionStrength($region, $regionsById);
      }

      if ($availableStrength <= $regionStrength) {
        continue;
      }

      $options[$regionId] = $regionStrength;
    }

    return $options;
  }

  /**
   * Strength the Presidency has available to deploy: 1 per ready family
   * member and regiment in its home region's army, plus the strength of
   * each ready local alliance.
   */
  private function getAvailableStrength(string $presidencyId)
  {
    $readyLocation = Locations::armyOfReady($presidencyId);

    $strength = count(FamilyMembers::getInLocation($readyLocation)->toArray());

    foreach (ArmyPieces::getInLocation($readyLocation)->toArray() as $piece) {
      $strength += $piece->getType() === LOCAL_ALLIANCE ? $piece->getStrength() : 1;
    }

    return $strength;
  }

  /**
   * Strength of the region, or the combined strength of every region in its
   * empire when the region is a capital or dominated by one.
   */
  private function getRegionStrength(Region $region, $regionsById)
  {
    $capitalRegionId = $region->isCapital()
      ? $region->getId()
      : ($region->isDominatedByRegion() ? $region->getControl() : null);

    if ($capitalRegionId === null) {
      return $region->getStrength();
    }

    $strength = 0;
    foreach ($regionsById as $otherRegion) {
      if ($otherRegion->getId() === $capitalRegionId || $otherRegion->getControl() === $capitalRegionId) {
        $strength += $otherRegion->getStrength();
      }
    }
    return $strength;
  }

  private function insertState()
  {
    $args = $this->ctx->getArgs();
    $commanderPlayerId = $args['commanderPlayerId'];
    $presidentOfficeId = $args['presidentOfficeId'];
    $presidencyId = $args['presidencyId'];


    $this->ctx->insertAsBrother(new LeafNode([
      'action' => COMMANDER_DEPLOY,
      'playerId' => 'some',
      'activePlayerIds' => [$commanderPlayerId],
      'optional' => true,
      'args' => [
        'commanderPlayerId' => $commanderPlayerId,
        'presidentOfficeId' => $presidentOfficeId,
        'presidencyId' => $presidencyId ?? MADRAS_PRESIDENCY,
      ]
    ]));
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
    return clienttranslate('Deploy');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
