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
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class MilitaryAffairsAssign extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_MILITARY_AFFAIRS_ASSIGN;
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


  public function stMilitaryAffairsAssign()
  {
    $stateArgs = $this->argsMilitaryAffairsAssign();
    if ($stateArgs['skipOnEnteringState']) {
      $playerId = $this->getActivePlayerIds()[0];
      $player = Players::get($playerId);
      Notifications::message('${player_name} cannot assign any officers-in-training', [
        'player' => $player,
      ]);
      $this->setPlayerActionCompleted($playerId);
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

  public function argsMilitaryAffairsAssign()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $officersInTraining = FamilyMembers::getInLocation(Locations::officerInTraining());

    $data = [
      'armies' => array_map(function ($presidencyId) {
        return Locations::armyOfReady($presidencyId);
      }, [BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY]),
      'officersInTraining' => $officersInTraining,
      'skipOnEnteringState' => count($officersInTraining) === 0
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

  public function actPassMilitaryAffairsAssign()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actMilitaryAffairsAssign($args)
  {
    self::checkAction('actMilitaryAffairsAssign');
    $playerId = $this->checkPlayer();

    $assignedOfficers = $args->assignedOfficers;

    $stateArgs = $this->argsMilitaryAffairsAssign();

    $player = Players::get($playerId);

    foreach ($assignedOfficers as $data) {
      $id = $data->familyMemberId;
      $to = $data->to;

      if (!in_array($to, $stateArgs['armies'])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_019");
      }
      if (!isset($stateArgs['officersInTraining'][$id])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_020");
      }
      $familyMember = $stateArgs['officersInTraining'][$id];
      $familyMember->moveTo($player, $to);
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

}
