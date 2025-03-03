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
    $playerId = $this->checkPlayer();


    $familyAction = $args->familyAction;

    $stateArgs = $this->argsFamilyAction();

    if (!in_array($familyAction, $stateArgs['options'])) {
      throw new \feException("ERROR_003");
    }

    Players::get($stateArgs['playerId'])->getFamily()->setOpportunityMarker($familyAction);

    if (in_array($familyAction, [ENLIST_WRITER, SEEK_SHARE])) {
      $action = [
        'action' => $familyAction,
        'playerId' => 'all',
        'activePlayerId' => $stateArgs['playerId']
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    } else if ($familyAction === ENLIST_OFFICER) {
      AtomicActions::get($familyAction)->performAction($playerId);
    } else {
      AtomicActions::get(PURCHASE_ENTERPRISE)->performAction($playerId, $familyAction);
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

    $enterpriseOptions = AtomicActions::get(PURCHASE_ENTERPRISE)->getOptions($playerId);

    $options = [
      ENLIST_WRITER => count(AtomicActions::get(ENLIST_WRITER)->getOptions($playerId)) > 0,
      ENLIST_OFFICER => AtomicActions::get(ENLIST_OFFICER)->canPerformAction($playerId),
      PURCHASE_LUXURY => in_array(PURCHASE_LUXURY, $enterpriseOptions),
      PURCHASE_SHIPYARD => in_array(PURCHASE_SHIPYARD, $enterpriseOptions),
      PURCHASE_WORKSHOP => in_array(PURCHASE_WORKSHOP, $enterpriseOptions),
      SEEK_SHARE => count(AtomicActions::get(SEEK_SHARE)->getOptions($playerId)) > 0,
    ];

    return $options;
  }
}
