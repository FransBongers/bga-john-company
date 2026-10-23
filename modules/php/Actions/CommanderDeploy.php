<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
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
use Bga\Games\JohnCompany\Managers\ControlTokens;
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
      Game::get()->gamestate->setPlayerNonMultiactive($args['commanderPlayerId'], 'next');
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

    $familyMember = FamilyMembers::getInLocation(Locations::commander($stateArgs['presidencyId']))->toArray()[0];
    JoCoUtils::makeCheck($player, $numberOfDice, $familyMember);

    $nodeArgs = $this->ctx->getArgs();
    $this->ctx->insertAsBrother(Engine::buildTree([
      'action' => COMMANDER_DEPLOY_RESOLVE_CHECK,
      'args' => [
        'commanderPlayerId' => $nodeArgs['commanderPlayerId'],
        'presidentOfficeId' => $nodeArgs['presidentOfficeId'],
        'presidencyId' => $nodeArgs['presidencyId'],
        'regionId' => $regionId,
        'armyPieceIds' => $armyPieces,
        'officerIds' => $officers
      ]
    ]));

    $this->ctx->insertAsBrother(Engine::buildTree([
      'action' => TIMING_WINDOW_CHECK,
      'args' => [
        TIMING_WINDOW => AFTER_COMMANDER_DEPLOY_CHECK,
        BLACKMAIL_CARD => [DIPLOMATIC_CONNECTION_ID],
      ],
    ]));

    // if ($checkResult !== CATASTROPHIC_FAILURE) {
    //   $this->insertState();
    // }

    // $survivingPieces = $this->checkForLosses($selectedPieces);

    // $this->resolveCheck($player, $checkResult, $survivingPieces, $regionId, $stateArgs['presidencyId']);

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
        if ($region->getUnrest() === 0 && !$region->hasClosedOrders()) {
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

  // private function insertState()
  // {
  //   $args = $this->ctx->getArgs();
  //   $commanderPlayerId = $args['commanderPlayerId'];
  //   $presidentOfficeId = $args['presidentOfficeId'];
  //   $presidencyId = $args['presidencyId'];


  //   $this->ctx->insertAsBrother(new LeafNode([
  //     'action' => COMMANDER_DEPLOY,
  //     'playerId' => 'some',
  //     'activePlayerIds' => [$commanderPlayerId],
  //     'optional' => true,
  //     'args' => [
  //       'commanderPlayerId' => $commanderPlayerId,
  //       'presidentOfficeId' => $presidentOfficeId,
  //       'presidencyId' => $presidencyId ?? MADRAS_PRESIDENCY,
  //     ]
  //   ]));
  // }

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
