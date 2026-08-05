<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\SetupCard;

class CrownChairmanRequestDebtAdvancement extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_CHAIRMAN_REQUEST_DEBT_ADVANCEMENT;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.


  public function argsCrownChairmanRequestDebtAdvancement()
  {
    $info = $this->ctx->getInfo();
    $currentDebt = $info['currentDebt'];
    $newDebt = $info['newDebt'];

    $cost = $this->getPromiseCubeCost();

    $data = [
      'additionalAdvancement' => [
        'possible' => $newDebt !== MAX_DEBT,
        'cost' => $cost['addtional'],
        'playerCanPay' => [],
      ],
      'oneLessAdvancement' => [
        'possible' => $newDebt !== $currentDebt,
        'cost' => $cost['oneLess'],
        'playerCanPay' => [],
      ],
      'currentDebt' => $currentDebt,
      'newDebt' => $newDebt,
    ];

    $promiseCubesPerPlayer = Crown::getPromiseCubesForActivePlayers($info);
    foreach ($promiseCubesPerPlayer as $playerId => $playerCubeCount) {
      $data['additionalAdvancement']['playerCanPay'][$playerId] = $playerCubeCount >= $data['additionalAdvancement']['cost'];
      $data['oneLessAdvancement']['playerCanPay'][$playerId] = $playerCubeCount >= $data['oneLessAdvancement']['cost'];
    }

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

  public function actPassCrownChairmanRequestDebtAdvancement()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownChairmanRequestDebtAdvancement($args)
  {
    self::checkAction('actCrownChairmanRequestDebtAdvancement');
    $playerId = $this->checkPlayer();

    $continue = $args->continue;
    $oneLessAdvancement = $args->oneLessAdvancement;
    $additionalAdvancement = $args->additionalAdvancement;

    $stateArgs = $this->argsCrownChairmanRequestDebtAdvancement();
    $currentDebt = $stateArgs['currentDebt'];
    $newDebt = $stateArgs['newDebt'];

    $player = Players::get($playerId);
    $family = $player->getFamily();

    if ($oneLessAdvancement) {

      if (!$stateArgs['oneLessAdvancement']['possible']) {
        throw new \feException("ERROR_041");
      }
      if (!$stateArgs['oneLessAdvancement']['playerCanPay'][$playerId]) {
        throw new \feException("ERROR_042");
      }
      $newDebt -= 1;
      Notifications::message(clienttranslate('${player_name} requests one less Company Debt advancement'), ['player' => $player]);
      $family->payPromiseCubes($stateArgs['oneLessAdvancement']['cost']);
    } else if ($additionalAdvancement) {
      if (!$stateArgs['additionalAdvancement']['possible']) {
        throw new \feException("ERROR_043");
      }
      if (!$stateArgs['additionalAdvancement']['playerCanPay'][$playerId]) {
        throw new \feException("ERROR_044");
      }
      $newDebt += 1;
      Notifications::message(clienttranslate('${player_name} requests an additional Company Debt advancement'), ['player' => $player]);
      $family->payPromiseCubes($stateArgs['additionalAdvancement']['cost']);
    }
    if (!$continue) {
      // TODO: check if multiple advancements can be 'bought'
      // return
    }

    $crownPlayer = Crown::getPlayer();
    if ($currentDebt === $newDebt) {
      Notifications::message(clienttranslate('${player_name} does not advance the Debt marker'), [
        'player' => $crownPlayer
      ]);
    } else {
      Company::setDebt($newDebt);
      Company::incBalance(($newDebt - $currentDebt) * 5);
      Notifications::companyOperationChairman($crownPlayer, $newDebt, true, [], Company::getBalance());
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


  private function getPromiseCubeCost()
  {
    $climate = Crown::getClimate();
    $addtional = 0;
    $oneLess = 0;

    switch ($climate) {
      case BULL:
      case STAG:
        $addtional = 1;
        $oneLess = 2;
        break;
      case LION:
        $addtional = 2;
        $oneLess = 2;
        break;
      case BEAR:
        $addtional = 2;
        $oneLess = 1;
        break;
      case PEACOCK:
        $addtional = 3;
        $oneLess = 100; // Not possible because debt marker did not advance
      default:
        throw new \feException("ERROR_040");
    }

    return [
      'addtional' => $addtional,
      'oneLess' => $oneLess,
    ];
  }
}
