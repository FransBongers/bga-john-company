<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\AICards;
use Bga\Games\JohnCompany\Managers\Company;
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
          'playerId' => 'some',
          'familyId' => Players::get($playerId)->getFamilyId(),
          'activePlayerIds' => [$playerId],
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
    $this->stSetupChairman();
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

  function stSetupChairman()
  {
    $offices = Company::getOfficesWithTreasury();

    $initialTreasuries = [];

    foreach($offices as $officeId => $office) {
      $initialTreasuries[$officeId] = $office->getTreasury();
    }

    $node = [
      'children' => [
        [
          'action' => CHAIRMAN,
          'playerId' => 'some',
          'activePlayerIds' => [Offices::get(CHAIRMAN)->getPlayerId()],
          'initialTreasuries' => $initialTreasuries,
          'initialDebt' => Company::getDebt(),
        ]
      ],
    ];

    // TODO: Governor General or Director of Trade callback
    Engine::setup($node, ['method' => 'stSetupDirectorOfTrade']);
    Engine::proceed();
  }

  function stSetupDirectorOfTrade()
  {
    $playerId = Offices::get(DIRECTOR_OF_TRADE)->getPlayerId();

    $node = [
      'children' => [
        [
          'action' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'optional' => true,
        ],
        [
          'action' => DIRECTOR_OF_TRADE_TRANSFERS,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'optional' => true,
        ]
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupManagerOfShipping']);
    Engine::proceed();
  }

  function stSetupManagerOfShipping()
  {
    $offices = Offices::getAll();

    $officesInGame = [MANAGER_OF_SHIPPING];
    $node = [
      'children' => array_map(function ($officeId) use ($offices) {
        return [
          'action' => $officeId,
          'playerId' => 'some',
          'activePlayerIds' => [$offices[$officeId]->getPlayerId()],
        ];
      }, $officesInGame),
    ];

    Engine::setup($node, ['method' => 'stSetupMilitaryAffairs']);
    Engine::proceed();
  }

  function stSetupMilitaryAffairs()
  {
    $playerId = Offices::get(MILITARY_AFFAIRS)->getPlayerId();

    $node = [
      'children' => [
        [
          'action' => MILITARY_AFFAIRS_TRANSFERS,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'optional' => true,
        ],
        [
          'action' => MILITARY_AFFAIRS_ASSIGN,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
        ]
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupPresidencyOperations']);
    Engine::proceed();
  }

  function stSetupPresidencyOperations()
  {
    $offices = Offices::getAll();

    $officesInGame = [PRESIDENT_OF_BOMBAY, PRESIDENT_OF_MADRAS, PRESIDENT_OF_BENGAL];
    $node = [
      'children' => array_map(function ($officeId) use ($offices) {
        return [
          'action' => PRESIDENCY_DECIDE_ORDER,
          'playerId' => 'some',
          'activePlayerIds' => [$offices[$officeId]->getPlayerId()],
          'officeId' => $officeId,
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
