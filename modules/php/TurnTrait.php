<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\AICards;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;


trait TurnTrait
{
  /**
   * State function when starting a turn useful to intercept
   * for some cards that happens at that moment
   */
  function stBeforeStartOfTurn()
  {
    // TODO: check end callback
    $this->initCustomDefaultTurnOrder('default', \ST_TURNACTION, ST_BEFORE_START_OF_TURN, true);
  }


  function stSetupDraft()
  {
    $draftVariant = Globals::getDraftSetup();

    $node = [
      'children' => [],
    ];

    if ($draftVariant) {

      $playerCount = Players::count();
      // For 3-6 players there is one less round
      // than number of cards as there is only of card left
      $playerCountRoundsMap = [
        1 => 4,
        2 => 2,
        3 => 3,
        4 => 2,
        5 => 2,
        6 => 2,
      ];
      $numberOfDraftRounds = $playerCountRoundsMap[$playerCount];
      for ($i = 0; $i < $numberOfDraftRounds; $i++) {
        $node['children'][] = [
          'action' => DRAFT_CARD,
          'playerId' => 'all',
        ];
      }
    }

    $node['children'][] =  [
      'action' => PERFORM_SETUP,
    ];

    // If crown in in the game we need to draw card to set initial climate
    $callback = Globals::getCrownInGame() ? 'stSetupCrownClimate' : 'stSetupFamilyActions';

    Engine::setup($node, ['method' => $callback]);
    Engine::proceed();
  }

  function stSetupCrownClimate()
  {
    Crown::drawCardAndSetClimate();

    $this->stSetupFamilyActions();
  }

  // .########....###....##.....##.####.##.......##....##
  // .##.........##.##...###...###..##..##........##..##.
  // .##........##...##..####.####..##..##.........####..
  // .######...##.....##.##.###.##..##..##..........##...
  // .##.......#########.##.....##..##..##..........##...
  // .##.......##.....##.##.....##..##..##..........##...
  // .##.......##.....##.##.....##.####.########....##...

  function stSetupFamilyActions()
  {
    Globals::setPhase(FAMILY);
    Notifications::nextPhase(FAMILY);

    $chairmanFamilyId = Utils::filter(Families::getAll()->toArray(), function ($family) {
      return $family->hasChairmanMarker();
    })[0]->getId();

    $player = Players::getPlayerForFamily($chairmanFamilyId);

    $turnOrder = Players::getTurnOrder($player->getId());
    $node = [
      'children' => array_map(function ($playerId) {
        return [
          'action' => FAMILY_ACTION,
          'playerId' => 'all',
          'familyId' => Players::get($playerId)->getFamilyId(),
          'activePlayerId' => $playerId,
        ];
      }, $turnOrder),
    ];

    $node['children'][] = [
      'action' => NEW_COMPANY_SHARES,
    ];

    Engine::setup($node, ['method' => 'stSetupFirmsPhase']);
    Engine::proceed();
  }

  // .########.####.########..##.....##..######.
  // .##........##..##.....##.###...###.##....##
  // .##........##..##.....##.####.####.##......
  // .######....##..########..##.###.##..######.
  // .##........##..##...##...##.....##.......##
  // .##........##..##....##..##.....##.##....##
  // .##.......####.##.....##.##.....##..######.

  function stSetupFirmsPhase()
  {
    /**
     * TODO: setup Engine if Private firms are in the game,
     * otherwise Notif that there is no firms phase
     */

    $this->stSetupHiring();
  }

  // .##.....##.####.########..####.##....##..######..
  // .##.....##..##..##.....##..##..###...##.##....##.
  // .##.....##..##..##.....##..##..####..##.##.......
  // .#########..##..########...##..##.##.##.##...####
  // .##.....##..##..##...##....##..##..####.##....##.
  // .##.....##..##..##....##...##..##...###.##....##.
  // .##.....##.####.##.....##.####.##....##..######..

  function stSetupHiring()
  {
    /**
     * TODO: setup Engine if there are vacant offices,
     * otherwise Notif that there are no vacant offices
     */
    $this->stSetupCompanyOperation();
  }

  // ..######...#######..##.....##.########.....###....##....##.##....##
  // .##....##.##.....##.###...###.##.....##...##.##...###...##..##..##.
  // .##.......##.....##.####.####.##.....##..##...##..####..##...####..
  // .##.......##.....##.##.###.##.########..##.....##.##.##.##....##...
  // .##.......##.....##.##.....##.##........#########.##..####....##...
  // .##....##.##.....##.##.....##.##........##.....##.##...###....##...
  // ..######...#######..##.....##.##........##.....##.##....##....##...

  // ..#######..########..########.########.....###....########.####..#######..##....##
  // .##.....##.##.....##.##.......##.....##...##.##......##.....##..##.....##.###...##
  // .##.....##.##.....##.##.......##.....##..##...##.....##.....##..##.....##.####..##
  // .##.....##.########..######...########..##.....##....##.....##..##.....##.##.##.##
  // .##.....##.##........##.......##...##...#########....##.....##..##.....##.##..####
  // .##.....##.##........##.......##....##..##.....##....##.....##..##.....##.##...###
  // ..#######..##........########.##.....##.##.....##....##....####..#######..##....##

  function stSetupCompanyOperation()
  {
    $offices = Offices::getAll();

    $officesInGame = [CHAIRMAN, DIRECTOR_OF_TRADE, MANAGER_OF_SHIPPING, MILITARY_AFFAIRS];
    $node = [
      'children' => array_map(function ($officeId) use ($offices) {
        return [
          'action' => $officeId,
          'playerId' => 'all',
          'activePlayerId' => $offices[$officeId]->getPlayerId(),
        ];
      }, $officesInGame),
    ];

    Engine::setup($node, ['method' => 'setupGameTurn']);
    Engine::proceed();
  }

  function setupGameTurn() {}

  /**
   * Activate next player
   * TODO: is this even used?
   */
  function stTurnAction()
  {
    $player = Players::getActive();
    self::giveExtraTime($player->getId());

    $node = [
      'children' => [],
    ];
    // Notifications::startTurn($player);

    // Inserting leaf Action card
    Engine::setup($node, ['method' => 'stTurnAction']);
    Engine::proceed();
  }


  function endOfGameInit()
  {
    // if (Globals::getEndFinalScoringDone() !== true) {
    //   // Trigger discard state
    //   Engine::setup(
    //     [
    //       'action' => DISCARD_SCORING,
    //       'playerId' => 'all',
    //       'args' => ['current' => Players::getActive()->getId()],
    //     ],
    //     ''
    //   );
    //   Engine::proceed();
    // } else {
    //   // Goto scoring state
    //   $this->gamestate->jumpToState(\ST_PRE_END_OF_GAME);
    // }
    // return;
  }

  function stPreEndOfGame() {}


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
