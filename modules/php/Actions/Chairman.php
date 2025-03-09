<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class Chairman extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CHAIRMAN;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsChairman()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];
    $initialDebt = $info['initialDebt'];
    $initialTreasuries = $info['initialTreasuries'];

    $player = Players::get($playerId);
    $playerShareCount = $player->getFamily()->getShareCount();
    $requiredShareCount = max(Company::getRequiredNumberForShareMajority() - $playerShareCount, 0);

    $currentDebt = Company::getDebt();

    $debtOptions = [
      'currentDebt' => $currentDebt,
      'noVote' => [],
      'vote' => [],
      'requiredShareCount' => $requiredShareCount
    ];

    foreach (range(0, 8) as $value) {
      if ($value <= $currentDebt) {
        continue;
      }
      if ($value <= $initialDebt + 3 || $requiredShareCount <= 0) {
        $debtOptions['noVote'][] = $value;
      } else {
        $debtOptions['vote'][] = $value;
      }
    }

    $data = [
      'companyBalance' => Company::getBalance(),
      'activePlayerIds' => [$playerId],
      'initialDebt' => $initialDebt,
      'initialTreasuries' => $initialTreasuries,
      'debtOptions' => $debtOptions,
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

  public function actPassChairman()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actChairman($args)
  {
    self::checkAction('actChairman');
    $playerId = $this->checkPlayer();

    // Value to vote for or null
    $debtVote = $args->debtVote;
    // Value of company Debt
    $companyDebt = $args->companyDebt;
    // Value per treasury
    $treasuries = $args->treasuries;
    // Boolean
    $propose = $args->propose;

    $stateArgs = $this->argsChairman();
    $this->updateGame($stateArgs, $playerId, $companyDebt, $treasuries);

    if (!$propose && Company::getBalance() > 0) {
      throw new \feException("ERROR_008");
    }

    // value to be voted for noeeds to be in options and greater than current company debt
    if ($debtVote !== null && ($debtVote <= Company::getDebt() || !in_array($debtVote, $stateArgs['debtOptions']['vote']))) {
      throw new \feException("ERROR_009");
    }
    if ($debtVote !== null) {
      Notifications::message(clienttranslate('${player_name} asks for consent to increase Company Debt to ${tkn_boldText_value}'), [
        'player' => Players::get($playerId),
        'tkn_boldText_value' => $debtVote,
      ]);

      $families = Families::getAll();

      $playerIdsWithShare = array_values(array_unique(array_map(function ($familyMember) use ($families) {
        return $families[$familyMember->getFamilyId()]->getPlayer()->getId();
      }, Company::getShares())));


      $this->ctx->insertBefore(
        new LeafNode([
          'action' => CHAIRMAN_DEBT_CONSENT,
          'playerId' => 'all',
          'activePlayerIds' => Utils::filter($playerIdsWithShare, function ($pId) use ($playerId) {
            return $pId !== $playerId;
          }),
          'yay' => [$playerId],
          'nay' => [],
          'debt' => $debtVote,
        ])
      );
      Engine::save();
      Engine::proceed();
      return;
    }

    if ($propose) {
      Engine::proceed();
    } else {
      $this->resolveAction([], true);
    }
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function updateDebt($newDebt, $debtOptions)
  {
    $currentDebt = $debtOptions['currentDebt'];
    // Debt is set to a value that is not allowed without a vote
    if ($newDebt !== $currentDebt && !in_array($newDebt, $debtOptions['noVote'])) {
      throw new \feException("ERROR_006");
    }
    // Update data
    if ($newDebt > $currentDebt) {
      Company::setDebt($newDebt);
      Company::incBalance(($newDebt - $currentDebt) * 5);
      return true;
    } else {
      return false;
    }
  }

  private function updateTreasuries($treasuries, $initialTreasuries)
  {
    $updatedTreasuries = [];
    $offices = Company::getOfficesWithTreasury();
    $companyBalance = Company::getBalance();
    foreach ($offices as $officeId => $office) {
      $newTreasury = $treasuries->{$officeId};

      // Not allowed to decrease treasuty to below starting value
      if ($newTreasury < $initialTreasuries[$officeId]) {
        throw new \feException("ERROR_007");
      }

      if ($office->getTreasury() !== $newTreasury) {
        $increase = $newTreasury - $office->getTreasury();

        $office->setTreasury($newTreasury);

        $updatedTreasuries[$officeId] = $newTreasury;
        $companyBalance -= $increase;
      }
    }
    Company::setBalance($companyBalance);
    return $updatedTreasuries;
  }

  private function updateGame($stateArgs, $playerId, $companyDebt, $treasuries)
  {

    $debtOptions = $stateArgs['debtOptions'];

    $debtIncreased = $this->updateDebt($companyDebt, $debtOptions);
    $updatedTreasuries = $this->updateTreasuries($treasuries, $stateArgs['initialTreasuries']);
    if ($debtIncreased || count($updatedTreasuries) > 0) {
      Notifications::companyOperationChairman(Players::get($playerId), $companyDebt, $debtIncreased, $updatedTreasuries, Company::getBalance());
    }
  }
}
