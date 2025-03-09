<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class FamilyAction extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected $crownActions = [
    BULL => [SEEK_SHARE, PURCHASE_SHIPYARD, ENLIST_WRITER, ENLIST_WRITER, ENLIST_OFFICER],
    STAG => [SEEK_SHARE, ENLIST_WRITER, PURCHASE_SHIPYARD, ENLIST_WRITER, ENLIST_OFFICER],
    LION => [PURCHASE_SHIPYARD, ENLIST_OFFICER, ENLIST_WRITER, ENLIST_OFFICER],
    BEAR => [ENLIST_OFFICER, PURCHASE_LUXURY, PURCHASE_WORKSHOP, ENLIST_OFFICER, ENLIST_WRITER],
    PEACOCK => [PURCHASE_WORKSHOP, PURCHASE_LUXURY, ENLIST_OFFICER, ENLIST_OFFICER, ENLIST_WRITER],
  ];

  public function getState()
  {
    return ST_FAMILY_ACTION;
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

  public function stFamilyAction()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];

    if ($playerId === CROWN_PLAYER_ID) {
      $this->performCrownAction();
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

  public function argsFamilyAction()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];

    $data = [
      'activePlayerIds' => [$playerId],
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
    $playerId = $this->checkPlayer();


    $familyAction = $args->familyAction;

    $stateArgs = $this->argsFamilyAction();

    if (!in_array($familyAction, $stateArgs['options'])) {
      throw new \feException("ERROR_003");
    }

    Players::get($playerId)->getFamily()->setOpportunityMarker($familyAction);

    if (in_array($familyAction, [ENLIST_WRITER, SEEK_SHARE])) {
      $action = [
        'action' => $familyAction,
        'playerId' => 'all',
        'activePlayerIds' => [$playerId]
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    } else {
      AtomicActions::get($familyAction)->performAction($playerId);
    }

    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions($playerId)
  {
    $player = Players::get($playerId);
    $familyId = $player->getFamilyId();
    $family = Families::get($familyId);

    // $enterpriseOptions = AtomicActions::get(PURCHASE_ENTERPRISE)->getOptions($playerId);

    $options = [];

    foreach ([ENLIST_WRITER, ENLIST_OFFICER, PURCHASE_LUXURY, PURCHASE_SHIPYARD, PURCHASE_WORKSHOP, SEEK_SHARE] as $familyAction) {
      $atomicAction = AtomicActions::get($familyAction);
      $options[$familyAction] = $atomicAction->canBePerformedBy($family);
    }
    // $options = [
    //   ENLIST_WRITER => count(AtomicActions::get(ENLIST_WRITER)->getOptions($playerId)) > 0,
    //   ENLIST_OFFICER => AtomicActions::get(ENLIST_OFFICER)->canPerformAction($playerId),
    //   PURCHASE_LUXURY => in_array(PURCHASE_LUXURY, $enterpriseOptions),
    //   PURCHASE_SHIPYARD => in_array(PURCHASE_SHIPYARD, $enterpriseOptions),
    //   PURCHASE_WORKSHOP => in_array(PURCHASE_WORKSHOP, $enterpriseOptions),
    //   SEEK_SHARE => count(AtomicActions::get(SEEK_SHARE)->getOptions($playerId)) > 0,
    // ];

    return $options;
  }

  // ..######..########...#######..##......##.##....##
  // .##....##.##.....##.##.....##.##..##..##.###...##
  // .##.......##.....##.##.....##.##..##..##.####..##
  // .##.......########..##.....##.##..##..##.##.##.##
  // .##.......##...##...##.....##.##..##..##.##..####
  // .##....##.##....##..##.....##.##..##..##.##...###
  // ..######..##.....##..#######...###..###..##....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  private function performCrownAction()
  {
    $family = Families::get(CROWN);
    $climate = Crown::getClimate();

    // 1. Free Writer Enlistment (TODO)

    // 
    $numberOfFamilyActions = count(Players::getAll()) === 1 ? 2 : 1;

    $extraAction = null; // TODO: get extra action from passed law

    $actionOrder = $this->crownActions[$climate];

    foreach ($actionOrder as $familyAction) {
      if ($numberOfFamilyActions === 0) {
        continue;
      }
      $action = AtomicActions::get($familyAction);
      if (!$action->canBePerformedBy($family)) {
        continue;
      }

      $action->performCrownAction();

      if ($familyAction === $extraAction) {
        $extraAction = null;
      } else {
        $numberOfFamilyActions--;
      }
    }
  }
}
