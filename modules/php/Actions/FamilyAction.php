<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class FamilyAction extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_FAMILY_ACTION;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsFamilyAction()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerId'];

    $data = [
      'playerId' => $playerId,
      'options' => $this->getOptions($playerId),
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

  public function actPassFamilyAction()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actFamilyAction($args)
  {
    self::checkAction('actFamilyAction');

    $familyAction = $args->familyAction;

    Notifications::log('familyAction', $familyAction);

    $stateArgs = $this->argsFamilyAction();

    $action = [
      'action' => $familyAction,
      'playerId' => 'all',
      'activePlayerId' => $stateArgs['playerId']
    ];
    Notifications::log('action', $action);

    $this->ctx->insertAsBrother(Engine::buildTree($action));

    

    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions($playerId) {
    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();
    $family = Families::get($familyId);

    $options = [
      ENLIST_WRITER => count(AtomicActions::get(ENLIST_WRITER)->getOptions($playerId)) > 0,
    ];
    // // TODO: count familyMembers on prizes
    // $hasFamilyMembers = count(FamilyMembers::getInLocation(Locations::familyMemberSupply($familyId))) > 0;
    // if ($hasFamilyMembers) {
    //   $options[] = ENLIST_WRITER;
    //   $options[] = ENLIST_OFFICER;
    // }

    // $treasury = $family->getTreasury();

    // if ($treasury >= 4 && count(Enterprises::getInLocation(Locations::enterpriseSupply(LUXURY))) > 0) {
    //   $options[] = PURCHASE_LUXURY;
    // }

    // if ($treasury >= 2 && count(Enterprises::getInLocation(Locations::enterpriseSupply(SHIPYARD))) > 0) {
    //   $options[] = PURCHASE_SHIPYARD;
    // }

    // if ($treasury >= 5 && count(Enterprises::getInLocation(Locations::enterpriseSupply(WORKSHOP))) > 0) {
    //   $options[] = PURCHASE_WORKSHOP;
    // }

    return $options;
  }
}
