<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\UserException;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Prizes;
use Bga\Games\JohnCompany\Models\Player;

class LondonSeasonRetire extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_LONDON_SEASON_RETIRE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsLondonSeasonRetire()
  {
    $args = $this->ctx->getArgs();
    $familyId = $args['familyId'];

    $family = Families::get($familyId);

    $data = [
      'familyMembers' => Utils::filter(FamilyMembers::getInLocation(Locations::pensioners())->toArray(), fn($fm) => $fm->getFamilyId() === $familyId),
      'treasury' => $family->getTreasury(),
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

  public function actPassLondonSeasonRetire()
  {
    $this->resolveAction(PASS);
  }

  public function actLondonSeasonRetire($args)
  {
    self::checkAction('actLondonSeasonRetire');
    $playerId = $this->checkPlayer();

    $familyId = $this->ctx->getArgs()['familyId'];
    $family = Families::get($familyId);
    $player = $family->getPlayer();

    $selectedPrizes = (array) $args->selectedPrizes;
    $stateArgs = $this->argsLondonSeasonRetire();
    $familyMembers = $stateArgs['familyMembers'];
    $familyMemberIds = array_map(fn($familyMember) => $familyMember->getId(), $familyMembers);

    $totalCost = 0;
    $totalVictoryPoints = 0;
    $initialTreasury = $family->getTreasury();
    foreach ($selectedPrizes as $familyMemberId => $prizeId) {
      if (!in_array($familyMemberId, $familyMemberIds)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_053");
      }

      $prize = Prizes::get($prizeId);

      if ($prize === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_054");
      }

      $prizeCost = $prize[COST];

      $totalCost += $prizeCost;
      $totalVictoryPoints += $prize[VICTORY_POINTS];

      $family->pay($prizeCost);
      FamilyMembers::get($familyMemberId)->retireTo($player, $prizeId, $prizeCost);
      if ($prize[VICTORY_POINTS] > 0) {
        Game::get()->bga->playerScore->inc($playerId, $prize[VICTORY_POINTS]);
      }
    }

    if ($totalCost > $initialTreasury) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_055");
    }

    if ($totalCost > 0) {
      $retirementsMoney = Globals::getRetirementMoney();
      $retirementsMoney[$player->getId()] = $totalCost;
      Globals::setRetirementMoney($retirementsMoney);
      Notifications::updateLondonSeasonOrder();
    }

    foreach ($familyMembers as $familyMember) {
      if (!array_key_exists($familyMember->getId(), $selectedPrizes)) {
        $familyMember->returnToSupply();
      }
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('LondonSeasonRetire');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
