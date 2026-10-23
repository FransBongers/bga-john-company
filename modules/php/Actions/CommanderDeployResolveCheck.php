<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\ControlTokens;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Region;

class CommanderDeployResolveCheck extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_COMMANDER_DEPLOY_RESOLVE_CHECK;
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

  public function stCommanderDeployResolveCheck()
  {
    $latestCheck = Globals::getLatestCheck();

    $playerMakingCheckId = $latestCheck['playerId'];
    $familyMemberId = $latestCheck['familyMemberId'];
    $checkResult = $latestCheck['result'];

    $args = $this->ctx->getArgs();
    $regionId = $args['regionId'];
    $armyPieceIds = $args['armyPieceIds'];
    $officerIds = $args['officerIds'];
    $presidencyId = $args['presidencyId'];


    if ($checkResult === CATASTROPHIC_FAILURE) {
      JoCoUtils::resolveCatastrophicFailure(Players::get($playerMakingCheckId), FamilyMembers::get($familyMemberId));
    } else {
      $this->insertState();
    }

    $armyPieces = count($armyPieceIds) > 0 ? ArmyPieces::getMany($armyPieceIds)->toArray() : [];
    $officers = count($officerIds) > 0 ? FamilyMembers::getMany($officerIds)->toArray() : [];

    $selectedPieces = array_merge($armyPieces, $officers);

    $survivingPieces = $this->checkForLosses($selectedPieces);

    $player = Players::get($playerMakingCheckId);
    $this->resolveCheck($player, $checkResult, $survivingPieces, $regionId, $presidencyId);

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

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
      $family = $player->getFamily();
      $family->loseHalfTrophiesRoundedUp();
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
  private function distributeLoot(Region $region, array $pieces, int $commanderPlayerId)
  {
    $controlToken = ControlTokens::getByRegion($region->getId());

    $wasLooted = $controlToken->isLooted();

    $officers = Utils::filter($pieces, function ($piece) {
      return $piece->getType() === FAMILY_MEMBER;
    });

    $lootValue = $wasLooted ? 0 : $region->getLoot();
    $loot = max(4 * $region->getStrength() + $lootValue, count($officers) + 1);

    Notifications::message(clienttranslate('Total loot is ${tkn_boldText_loot}'), [
      'tkn_boldText_loot' => '£' . $loot,
    ]);

    if (!$wasLooted) {
      $controlToken->setLooted(1);
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

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('CommanderDeployResolveCheck');
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
