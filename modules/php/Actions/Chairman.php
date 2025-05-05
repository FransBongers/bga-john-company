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
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class Chairman extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected $crownFirstAdvancementCost = [
    BULL => 1,
    STAG => 2,
    LION => 3,
    BEAR => 4,
    PEACOCK => 6,
  ];
  protected $crownBalanceFavor = [
    BULL => 3,
    STAG => 4,
    LION => 4,
    BEAR => 4,
    PEACOCK => 5,
  ];

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
    $family = $player->getFamily();
    $playerShareCount = $family->getShareCount();
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
        continue;
      }

      $debtOptions['vote'][] = $value;
    }

    if (Crown::isInGame() && count(Company::getShares(CROWN)) > 0) {
      $debtOptions['promiseCubeCost'] = [];
      $debtOptions['crownVotes'] = count(Company::getShares(CROWN));

      $climate = Crown::getClimate();
      $promiseCubesChairman = $family->getCrownPromiseCubes();

      $cumulativeCost = 0;

      foreach ($debtOptions['vote'] as $value) {
        $cumulativeCost += $value === $initialDebt + 4 ? $this->crownFirstAdvancementCost[$climate] : 1;
        if ($cumulativeCost <= $promiseCubesChairman) {
          $debtOptions['promiseCubeCost'][$value] = $cumulativeCost;
        }
      }
    }

    $data = [
      'companyBalance' => Company::getBalance(),
      'activePlayerIds' => [$playerId],
      'initialDebt' => $initialDebt,
      'initialTreasuries' => $initialTreasuries,
      'debtOptions' => $debtOptions,
      'crownPromiseCubes' => $family->getCrownPromiseCubes(),
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
    $updatedTreasuries = $this->updateGame($stateArgs, $playerId, $companyDebt, $treasuries);

    if (!$propose && Company::getBalance() > 0) {
      throw new \feException("ERROR_008");
    }

    $saveAndProceed = false;

    if ($debtVote !== null) {
      $saveAndProceed = $this->handleDebtVote($debtVote, $stateArgs, $playerId);
    }

    if ($saveAndProceed) {
      Engine::save();
      Engine::proceed();
      return;
    }

    if ($propose) {
      Engine::proceed();
      return;
    }

    // Gain promise cubes from the crown
    if (Crown::isInGame()) {
      $this->gainPromiseCubesForAllocatingBalance($playerId, $stateArgs, $updatedTreasuries);
      Crown::drawCardAndSetClimate();
    }

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

  private function gainPromiseCubesForAllocatingBalance($playerId, $stateArgs, $updatedTreasuries)
  {
    $promiseCubesGained = 0;
    $amountPerPromiseCube = $this->crownBalanceFavor[Crown::getClimate()];
    $initialTreasuries = $stateArgs['initialTreasuries'];

    $offices = Offices::getAll();

    foreach ($updatedTreasuries as $officeId => $value) {
      if ($offices[$officeId]->getFamilyId() === CROWN) {
        $promiseCubesGained += floor(($value - $initialTreasuries[$officeId]) / $amountPerPromiseCube);
      }
    }

    $promiseCubesGained = min(Families::get(CROWN)->getCrownPromiseCubes(), $promiseCubesGained);

    Players::get($playerId)->getFamily()->gainPromiseCubes($promiseCubesGained);
  }

  private function handleDebtVote($debtVote, $stateArgs, $playerId)
  {
    $debtOptions = $stateArgs['debtOptions'];

    // value to be voted for needs to be in options and greater than current company debt
    if ($debtVote <= Company::getDebt() || !in_array($debtVote, $debtOptions['vote'])) {
      throw new \feException("ERROR_034");
    }

    $player = Players::get($playerId);
    Notifications::message(clienttranslate('${player_name} asks for consent to increase Company Debt to ${tkn_boldText_value}'), [
      'player' => $player,
      'tkn_boldText_value' => $debtVote,
    ]);

    $families = Families::getAll();

    $playerIdsWithShare = array_values(array_unique(array_map(function ($familyMember) use ($families) {
      return $families[$familyMember->getFamilyId()]->getPlayer()->getId();
    }, Company::getShares())));

    $yay = [$playerId];

    $insertNode = true;

    // TODO: 2p game where it is possible the crown does not need to give consent?
    if (in_array(CROWN_PLAYER_ID, $playerIdsWithShare)) {
      $yay[] = CROWN_PLAYER_ID;

      $promiseCubesToPay = $debtOptions['promiseCubeCost'][$debtVote];

      $data = $player->getFamily()->payPromiseCubes($promiseCubesToPay, false);
      Notifications::payPromiseCubesForConsent($player, $data['amount']);


      if ($debtOptions['crownVotes'] >= $debtOptions['requiredShareCount']) {
        AtomicActions::get(CHAIRMAN_DEBT_CONSENT)->courtOfDirectorsGivesConsent($debtVote);
        $insertNode = false;
      }
    }

    if ($insertNode) {
      $this->ctx->insertBefore(
        new LeafNode([
          'action' => CHAIRMAN_DEBT_CONSENT,
          'playerId' => 'some',
          'activePlayerIds' => Utils::filter($playerIdsWithShare, function ($pId) use ($playerId) {
            return $pId !== $playerId && $pId !== CROWN_PLAYER_ID;
          }),
          'yay' => $yay,
          'nay' => [],
          'debt' => $debtVote,
        ])
      );
      return true;
    }
    return false;
  }

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
    return $updatedTreasuries;
  }
}
