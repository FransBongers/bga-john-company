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

}
