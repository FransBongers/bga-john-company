<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
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
    $playerId = $args['playerId'];
    $applyLettersOfIntroduction = $args[LETTERS_OF_INTRODUCTION_ID] ?? false;

    $player = Players::get($playerId);

    $data = [
      'familyMembers' => Utils::filter(FamilyMembers::getInLocation(Locations::pensioners())->toArray(), fn($fm) => $fm->getPlayerId() === $playerId),
      'treasury' => $player->getTreasury(),
      'discount' => $player->getRetirementDiscount($applyLettersOfIntroduction),
      FINAL_RETIREMENT => $args[FINAL_RETIREMENT] ?? false,
      'prizeFilter' => $player->hasPrestigeCard(LORD_HIGHGATE_ID) ? [PRIZE_8, PRIZE_12] : null,
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
    $playerId = $this->checkPlayer();
    $this->setPlayerActionCompleted($playerId);
    $this->resolveAction(PASS);
  }

  public function actLondonSeasonRetire($args)
  {
    self::checkAction('actLondonSeasonRetire');
    $playerId = $this->checkPlayer();

    $playerId = $this->ctx->getArgs()['playerId'];
    $family = PlayersExtra::get($playerId);
    $player = $family->getPlayer();

    $selectedPrizes = (array) $args->selectedPrizes;
    $stateArgs = $this->argsLondonSeasonRetire();
    $familyMembers = $stateArgs['familyMembers'];
    $familyMemberIds = array_map(fn($familyMember) => $familyMember->getId(), $familyMembers);
    $prizeFilter = $stateArgs['prizeFilter'];

    $totalCost = 0;
    $totalVictoryPoints = 0;
    $remainingDiscount = $stateArgs['discount'];


    $initialTreasury = $family->getTreasury();
    foreach ($selectedPrizes as $familyMemberId => $prizeId) {
      if (!in_array($familyMemberId, $familyMemberIds)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_053");
      }

      $prize = Prizes::get($prizeId);

      if ($prize === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_054");
      }
      if ($prizeFilter !== null && !in_array($prizeId, $prizeFilter)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_077");
      }

      $prizeCost = $prize[COST];
      $discountUsed = min($prizeCost, $remainingDiscount);
      $prizeCost -= $discountUsed;
      $remainingDiscount -= $discountUsed;

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

    if (count($selectedPrizes) > 0 && !$stateArgs[FINAL_RETIREMENT]) {
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

    $this->setPlayerActionCompleted($playerId);
    $this->resolveAction([], true);
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
