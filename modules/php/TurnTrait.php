<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\AICards;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Scenarios;

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
    $callback = Globals::getCrownInGame() ? 'stSetupCrownClimate' : 'stStartOfRound';
    Engine::setup($node, ['method' => $callback]);
    Engine::proceed();
  }


  function stSetupCrownClimate()
  {
    Crown::drawCardAndSetClimate();

    $this->stSetupFamilyActions();
  }

  function stStartOfRound()
  {
    $currentTurn = Globals::getTurn();
    Notifications::turn($currentTurn);

    $isFirstTurn = Scenarios::get()->getStartTurn() === $currentTurn;

    if ($isFirstTurn) {
      $this->stSetupFamilyActions();
    } else {
      $this->stSetupLondonSeason();
    }
  }


  // .##........#######..##....##.########...#######..##....##
  // .##.......##.....##.###...##.##.....##.##.....##.###...##
  // .##.......##.....##.####..##.##.....##.##.....##.####..##
  // .##.......##.....##.##.##.##.##.....##.##.....##.##.##.##
  // .##.......##.....##.##..####.##.....##.##.....##.##..####
  // .##.......##.....##.##...###.##.....##.##.....##.##...###
  // .########..#######..##....##.########...#######..##....##

  // ..######..########....###.....######...#######..##....##
  // .##....##.##.........##.##...##....##.##.....##.###...##
  // .##.......##........##...##..##.......##.....##.####..##
  // ..######..######...##.....##..######..##.....##.##.##.##
  // .......##.##.......#########.......##.##.....##.##..####
  // .##....##.##.......##.....##.##....##.##.....##.##...###
  // ..######..########.##.....##..######...#######..##....##

  function stSetupLondonSeason()
  {
    $this->updatePhase(LONDON_SEASON);

    $node = [
      'children' => [
        [
          'action' => LONDON_SEASON_ATTRITION,
        ],
        [
          'action' => LONDON_SEASON_CLEANUP,
        ]
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupFamilyActions']);
    Engine::proceed();
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
    $this->updatePhase(FAMILY);

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
    $this->updatePhase(HIRING);
    Notifications::message(clienttranslate('No open positions'), []);
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
    $this->updatePhase(CHAIRMAN);
    $offices = Company::getOfficesWithTreasury();

    $chairman = Offices::get(CHAIRMAN);
    $family = $chairman->getFamily();

    if ($family->getId() === CROWN) {
      $this->stSetupCrownChairman();
      return;
    }

    $initialTreasuries = [];

    foreach ($offices as $officeId => $office) {
      $initialTreasuries[$officeId] = $office->getTreasury();
    }



    if (Crown::isInGame() && $family->getId() !== CROWN && $family->getCrownPromiseCubes() > 0) {
      $family->payPromiseCubes(1);
    }

    $node = [
      'children' => [
        [
          'action' => CHAIRMAN,
          'playerId' => 'some',
          'activePlayerIds' => [$chairman->getPlayerId()],
          'initialTreasuries' => $initialTreasuries,
          'initialDebt' => Company::getDebt(),
        ]
      ],
    ];

    // TODO: Governor General or Director of Trade callback
    Engine::setup($node, ['method' => 'stSetupDirectorOfTrade']);
    Engine::proceed();
  }

  function stSetupCrownChairman()
  {

    $node = [
      'children' => [
        [
          'action' => CROWN_CHAIRMAN_SEEK_DEBT
        ],
        [
          'action' => CROWN_CHAIRMAN_REQUEST_ALLOCATION,
          'playerId' => 'some',
          'activePlayerIds' => Players::getNonCrownPlayerIds(),
        ],
        [
          'action' => CROWN_CHAIRMAN_ALLOCATE_COMPANY_BALANCE,
          'allocationStep' => 1,
        ],
      ],
    ];

    // TODO: Governor General or Director of Trade callback
    Engine::setup($node, ['method' => 'stSetupDirectorOfTrade']);
    Engine::proceed();
  }

  function stSetupDirectorOfTrade()
  {
    $this->updatePhase(DIRECTOR_OF_TRADE);
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
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupManagerOfShipping']);
    Engine::proceed();
  }

  function stSetupManagerOfShipping()
  {
    $this->updatePhase(MANAGER_OF_SHIPPING);
    $office = Offices::get(MANAGER_OF_SHIPPING);

    if ($office->getFamilyId() === CROWN) {
      $this->stSetupCrownManagerOfShipping();
      return;
    }

    $node = [
      'children' => [
        [
          'action' => MANAGER_OF_SHIPPING,
          'playerId' => 'some',
          'activePlayerIds' => [$office->getPlayerId()],
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupMilitaryAffairs']);
    Engine::proceed();
  }

  function stSetupCrownManagerOfShipping()
  {
    $node = [
      'children' => [
        [
          'action' => CROWN_MANAGER_OF_SHIPPING_FIT_SHIPS,
          'playerId' => 'some',
          'activePlayerIds' => Players::getNonCrownPlayerIds(),
        ],
        [
          'action' => CROWN_MANAGER_OF_SHIPPING_BUY_COMPANY_SHIPS,
          'playerId' => 'some',
          'activePlayerIds' => Players::getNonCrownPlayerIds(),
        ],
        [
          'action' => CROWN_MANAGER_OF_SHIPPING_LEASE_EXTRA_SHIPS,
          'playerId' => 'some',
          'activePlayerIds' => Players::getNonCrownPlayerIds(),
        ],
        [
          'action' => CROWN_MANAGER_OF_SHIPPING_PLACE_SHIPS,
          'playerId' => 'some',
          'activePlayerIds' => Players::getNonCrownPlayerIds(),
          'fit' => [],
          'buy' => [],
          'lease' => [],
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupMilitaryAffairs']);
    Engine::proceed();
  }

  function stSetupMilitaryAffairs()
  {
    $this->updatePhase(MILITARY_AFFAIRS);
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

    Engine::setup($node, ['method' => 'stSetupBombayPresidencyOperations']);
    Engine::proceed();
  }

  function stSetupBombayPresidencyOperations()
  {
    $this->updatePhase(BOMBAY_PRESIDENCY);

    $node = $this->setupPresidencyOperations(BOMBAY_PRESIDENCY);

    Engine::setup($node, ['method' => 'stSetupMadrasPresidencyOperations']);
    Engine::proceed();
  }

  function stSetupMadrasPresidencyOperations()
  {
    $this->updatePhase(MADRAS_PRESIDENCY);

    $node = $this->setupPresidencyOperations(MADRAS_PRESIDENCY);

    Engine::setup($node, ['method' => 'stSetupBengalPresidencyOperations']);
    Engine::proceed();
  }

  function stSetupBengalPresidencyOperations()
  {
    $this->updatePhase(BENGAL_PRESIDENCY);

    $node = $this->setupPresidencyOperations(BENGAL_PRESIDENCY);

    Engine::setup($node, ['method' => 'stSetupSuperintendentOfTradeInChina']);
    Engine::proceed();
  }

  function stSetupSuperintendentOfTradeInChina()
  {
    if (false) {
      $this->updatePhase(SUPERINTENDENT_OF_TRADE_IN_CHINA);
    }


    $this->stSetupBonuses();
  }

  // .########...#######..##....##.##.....##..######..########..######.
  // .##.....##.##.....##.###...##.##.....##.##....##.##.......##....##
  // .##.....##.##.....##.####..##.##.....##.##.......##.......##......
  // .########..##.....##.##.##.##.##.....##..######..######....######.
  // .##.....##.##.....##.##..####.##.....##.......##.##.............##
  // .##.....##.##.....##.##...###.##.....##.##....##.##.......##....##
  // .########...#######..##....##..#######...######..########..######.

  function stSetupBonuses()
  {
    $this->updatePhase(BONUSES);

    $node = [
      'children' => [
        [
          'action' => BONUSES,
          // 'playerId' => 'some',
          // 'activePlayerIds' => [],
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupRevenue']);
    Engine::proceed();
  }

  // .########..########.##.....##.########.##....##.##.....##.########
  // .##.....##.##.......##.....##.##.......###...##.##.....##.##......
  // .##.....##.##.......##.....##.##.......####..##.##.....##.##......
  // .########..######...##.....##.######...##.##.##.##.....##.######..
  // .##...##...##........##...##..##.......##..####.##.....##.##......
  // .##....##..##.........##.##...##.......##...###.##.....##.##......
  // .##.....##.########....###....########.##....##..#######..########

  function stSetupRevenue()
  {
    $this->updatePhase(REVENUE);

    $node = [
      'children' => [
        [
          'action' => REVENUE_EXPENSES,
        ],
        [
          'action' => REVENUE_CHECK_EXPECTATIONS,
        ],
        [
          'action' => REVENUE_PAY_DIVIDENDS,
          'playerId' => 'some',
          'activePlayerIds' => [Offices::get(CHAIRMAN)->getPlayerId()],
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupEventsInIndia']);
    Engine::proceed();
  }

  // .########.##.....##.########.##....##.########..######.....####.##....##
  // .##.......##.....##.##.......###...##....##....##....##.....##..###...##
  // .##.......##.....##.##.......####..##....##....##...........##..####..##
  // .######...##.....##.######...##.##.##....##.....######......##..##.##.##
  // .##........##...##..##.......##..####....##..........##.....##..##..####
  // .##.........##.##...##.......##...###....##....##....##.....##..##...###
  // .########....###....########.##....##....##.....######.....####.##....##

  // .####.##....##.########..####....###...
  // ..##..###...##.##.....##..##....##.##..
  // ..##..####..##.##.....##..##...##...##.
  // ..##..##.##.##.##.....##..##..##.....##
  // ..##..##..####.##.....##..##..#########
  // ..##..##...###.##.....##..##..##.....##
  // .####.##....##.########..####.##.....##

  function stSetupEventsInIndia()
  {
    $this->updatePhase(EVENTS_IN_INDIA);

    $node = [
      'children' => [
        [
          'action' => EVENTS_IN_INDIA_STORMS,
        ],
        [
          'action' => EVENTS_IN_INDIA_RESOLVE_EVENT,
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupParliamentMeets']);
    Engine::proceed();
  }

  // .########.....###....########..##.......####....###....##.....##.########.##....##.########
  // .##.....##...##.##...##.....##.##........##....##.##...###...###.##.......###...##....##...
  // .##.....##..##...##..##.....##.##........##...##...##..####.####.##.......####..##....##...
  // .########..##.....##.########..##........##..##.....##.##.###.##.######...##.##.##....##...
  // .##........#########.##...##...##........##..#########.##.....##.##.......##..####....##...
  // .##........##.....##.##....##..##........##..##.....##.##.....##.##.......##...###....##...
  // .##........##.....##.##.....##.########.####.##.....##.##.....##.########.##....##....##...

  // .##.....##.########.########.########..######.
  // .###...###.##.......##..........##....##....##
  // .####.####.##.......##..........##....##......
  // .##.###.##.######...######......##.....######.
  // .##.....##.##.......##..........##..........##
  // .##.....##.##.......##..........##....##....##
  // .##.....##.########.########....##.....#####

  function stSetupParliamentMeets()
  {
    $this->updatePhase(PARLIAMENT_MEETS);

    $node = [
      'children' => [
        [
          'action' => PARLIAMENT_MEETS,
          'playerId' => 'some',
          'optional' => true,
          // TODO: actual prime minister player
          'activePlayerIds' => [Players::getAll()->toArray()[0]->getId()],
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stSetupUpkeepAndRefresh']);
    Engine::proceed();
  }

  // .##.....##.########..##....##.########.########.########.
  // .##.....##.##.....##.##...##..##.......##.......##.....##
  // .##.....##.##.....##.##..##...##.......##.......##.....##
  // .##.....##.########..#####....######...######...########.
  // .##.....##.##........##..##...##.......##.......##.......
  // .##.....##.##........##...##..##.......##.......##.......
  // ..#######..##........##....##.########.########.##.......

  // .########..########.########.########..########..######..##.....##
  // .##.....##.##.......##.......##.....##.##.......##....##.##.....##
  // .##.....##.##.......##.......##.....##.##.......##.......##.....##
  // .########..######...######...########..######....######..#########
  // .##...##...##.......##.......##...##...##.............##.##.....##
  // .##....##..##.......##.......##....##..##.......##....##.##.....##
  // .##.....##.########.##.......##.....##.########..######..##.....##

  function stSetupUpkeepAndRefresh()
  {
    $this->updatePhase(UPKEEP_AND_REFRESH);

    $node = [
      'children' => [
        [
          'action' => UPKEEP_CHECK_PRIZES,
        ],
        [
          'action' => REFRESH_BOARD,
        ],
      ],
    ];

    Engine::setup($node, ['method' => 'stLastRoundCheck']);
    Engine::proceed();
  }

  function stLastRoundCheck()
  {
    $currentTurn = Globals::getTurn();
    $lastRound = Scenarios::get()->getEndTurn() === $currentTurn;

    if ($lastRound) {

      $node = [
        'children' => [
          [
            'action' => FINAL_SCORING,
          ],

        ],
      ];

      Engine::setup($node, ['method' => '']);
      Engine::proceed();
      return;
    } else {
      Globals::setTurn($currentTurn + 1);
      $this->stStartOfRound();
    }
  }

  function setupGameTurn() {}

  /**
   * Activate next player
   * TODO: is this even used?
   */
  function stTurnAction()
  {
    $player = Players::getActive();
    $this->giveExtraTime($player->getId());

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

  function setupPresidencyOperations(string $presidencyId)
  {
    $presidencyOfficeMap = [
      BOMBAY_PRESIDENCY => PRESIDENT_OF_BOMBAY,
      MADRAS_PRESIDENCY => PRESIDENT_OF_MADRAS,
      BENGAL_PRESIDENCY => PRESIDENT_OF_BENGAL,
    ];

    $offices = Offices::getAll();

    // return [
    //   'children' => [
    //     [
    //       'action' => PRESIDENCY_DECIDE_ORDER,
    //       'playerId' => 'some',
    //       'activePlayerIds' => [$office->getPlayerId()],
    //       'officeId' => $office->getId(),
    //     ]
    //   ],
    // ];
    $presidentOffice = $offices[$presidencyOfficeMap[$presidencyId]];
    $commander = $presidentOffice->getCommander();


    // TODO: check if there is a president?:
    $requiredChoiceCount = 1;
    $children = [
      [
        'action' => PRESIDENCY_TRADE,
        'playerId' => 'some',
        'optional' => true,
        'activePlayerIds' => [$presidentOffice->getPlayerId()],
        'officeId' => $presidentOffice->getId(),
      ],

    ];

    if ($commander !== null) {
      $requiredChoiceCount++;
      $children[] = [
        'action' => PRESIDENCY_COMMANDER,
        'playerId' => 'some',
        'activePlayerIds' => [$commander->getPlayerId()],
        'args' => [
          'officeId' => $presidentOffice->getId(),
          'presidencyId' => $presidencyId,
        ],
      ];
    }

    // TODO: if governor, push option

    return [
      'children' => [
        [
          'type' => NODE_OR,
          'children' => $children,
          'playerId' => $presidentOffice->getPlayerId(),
          'requiredChoiceCount' => $requiredChoiceCount,
          'stateDescription' => [
            'descriptionmyturn' => clienttranslate('${you} must choose who will act next'),
            'description' => clienttranslate('${actplayer} must choose who will act next'),
            'args' => []
          ]
          // 'activePlayerIds' => [$presidentOffice->getPlayerId()],
          // 'officeId' => $presidentOffice->getId(),
        ],
      ],
    ];
  }

  function updatePhase($phase)
  {
    Globals::setPhase($phase);
    Notifications::nextPhase($phase);
  }
}
