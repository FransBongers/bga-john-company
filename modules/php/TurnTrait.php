<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\FamilyActions;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Managers\RemovedGovernors;
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
    RemovedGovernors::reset();
    Globals::setRegionsLostThisTurn(0);

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
        ],
      ],
    ];

    Engine::setup($this->withPhaseWindows($node, LONDON_SEASON), ['method' => 'stSetupFamilyActions']);
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

    $chairmanPlayerId = PlayersExtra::getChairmanFamily()->getId();

    $extraAction = FamilyActions::getExtraAction();
    $turnOrder = Players::getTurnOrder($chairmanPlayerId);
    $node = [
      'children' => array_map(function ($playerId) use ($extraAction) {
        $playerNode = [
          'children' => [
            FamilyActions::getFamilyActionsNode($playerId),
          ]
        ];

        if ($extraAction !== null) {
          $playerNode['children'][] = FamilyActions::getExtraActionNode($extraAction, $playerId);
        }

        return $playerNode;
      }, $turnOrder),
    ];

    $node['children'][] = [
      'action' => NEW_COMPANY_SHARES,
    ];

    Engine::setup($this->withPhaseWindows($node, FAMILY), ['method' => 'stSetupFirmsPhase']);
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

    $this->updatePhase(FIRMS);
    $node = $this->withPhaseWindows(['children' => []], FIRMS);
    Engine::setup($node, ['method' => 'stSetupHiring']);
    Engine::proceed();
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

    $node = [
      'children' => [
        [
          'action' => HIRING_CHECK_VACANT_OFFICES,
        ],
      ],
    ];

    Engine::setup($this->withPhaseWindows($node, HIRING), ['method' => 'stSetupChairman']);
    Engine::proceed();
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
    $player = $chairman->getPlayer();

    if ($player->getId() === CROWN_PLAYER_ID) {
      $this->stSetupCrownChairman();
      return;
    }

    $initialTreasuries = [];

    foreach ($offices as $officeId => $office) {
      $initialTreasuries[$officeId] = $office->getTreasury();
    }



    if (Crown::isInGame() && $player->getId() !== CROWN_PLAYER_ID && $player->getCrownPromiseCubes() > 0) {
      $player->payPromiseCubes(1);
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
    $node = $this->withOfficeWindows($node, CHAIRMAN);
    Engine::setup($this->withPhaseWindows($node, COMPANY_OPERATIONS, true, false), ['method' => 'stCheckDirectorOfTradeOrGovernorGeneral']);
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
    $node = $this->withOfficeWindows($node, CHAIRMAN);
    Engine::setup($this->withPhaseWindows($node, COMPANY_OPERATIONS, true, false), ['method' => 'stCheckDirectorOfTradeOrGovernorGeneral']);
    Engine::proceed();
  }

  function stCheckDirectorOfTradeOrGovernorGeneral()
  {
    $governorGeneralInPlay = Offices::get(GOVERNOR_GENERAL)->getLocation() !== DECK;

    if ($governorGeneralInPlay) {
      $this->stSetupGovernorGeneral();
    } else {
      $this->stSetupDirectorOfTrade();
    }
  }

  function stSetupGovernorGeneral()
  {
    $this->updatePhase(GOVERNOR_GENERAL);
    $office = Offices::get(GOVERNOR_GENERAL);
    $playerId = $office->getPlayerId();

    $office->increaseCompanyBalance($playerId);
    Globals::setOfficeHolderBonus(0);

    $node = [
      'children' => [
        [
          'action' => GOVERNOR_GENERAL_MAKE_CHECK,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'optional' => true,
        ],
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
            TIMING_DATA => [
              'officeId' => GOVERNOR_GENERAL
            ],
          ],
        ]
      ],
    ];

    Engine::setup($this->withOfficeWindows($node, GOVERNOR_GENERAL, true, false), ['method' => 'stSetupManagerOfShipping']);
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
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
            TIMING_DATA => [
              'officeId' => DIRECTOR_OF_TRADE
            ],
          ],
        ]
      ],
    ];

    Engine::setup($this->withOfficeWindows($node, DIRECTOR_OF_TRADE, true, false), ['method' => 'stSetupManagerOfShipping']);
    Engine::proceed();
  }

  function stSetupManagerOfShipping()
  {
    $this->updatePhase(MANAGER_OF_SHIPPING);
    $office = Offices::get(MANAGER_OF_SHIPPING);

    if ($office->getPlayerId() === CROWN_PLAYER_ID) {
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
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
            TIMING_DATA => [
              'officeId' => MANAGER_OF_SHIPPING
            ],
          ],
        ]
      ],
    ];

    Engine::setup($this->withOfficeWindows($node, MANAGER_OF_SHIPPING, true, false), ['method' => 'stSetupMilitaryAffairs']);
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

    Engine::setup($this->withOfficeWindows($node, MANAGER_OF_SHIPPING), ['method' => 'stSetupMilitaryAffairs']);
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
        ],
        [
          'action' => MILITARY_AFFAIRS_CHECK_COMMANDER,
          'args' => [
            'presidencyId' => BOMBAY_PRESIDENCY,
          ]
        ],
        [
          'action' => MILITARY_AFFAIRS_CHECK_COMMANDER,
          'args' => [
            'presidencyId' => MADRAS_PRESIDENCY,
          ]
        ],
        [
          'action' => MILITARY_AFFAIRS_CHECK_COMMANDER,
          'args' => [
            'presidencyId' => BENGAL_PRESIDENCY,
          ]
        ],
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [IMMEDIATELY_AFTER_MILITARY_AFFAIRS_ACTS],

          ],
        ],
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING, BEFORE_BOMBAY_PRESIDENCY_OPERATIONS],
            TIMING_DATA => [
              'officeId' => MILITARY_AFFAIRS
            ],
          ],
        ]
      ],
    ];

    Engine::setup($this->withOfficeWindows($node, MILITARY_AFFAIRS, true, false), ['method' => 'stSetupBombayPresidencyOperations']);
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
    $office = Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA);
    $inPlay = $office->isInPlay();
    if (!$inPlay) {
      $this->stSetupBonuses();
      return;
    }

    $this->updatePhase(SUPERINTENDENT_OF_TRADE_IN_CHINA);
    Globals::setOfficeHolderBonus(0);

    $node = [
      'children' => [
        [
          'action' => TRADE_IN_CHINA,
          'playerId' => 'some',
          'optional' => true,
          'activePlayerIds' => [$office->getPlayerId()],
        ],
        [
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [AFTER_OFFICE_FINISHED_ACTING],
            TIMING_DATA => [
              'officeId' => SUPERINTENDENT_OF_TRADE_IN_CHINA
            ],
          ],
        ]
      ],
    ];

    Engine::setup($this->withOfficeWindows($node, SUPERINTENDENT_OF_TRADE_IN_CHINA, true, false), ['method' => 'stSetupBonuses']);
    Engine::proceed();
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

    Engine::setup($this->withPhaseWindows($node, COMPANY_OPERATIONS, false, true), ['method' => 'stSetupRevenue']);
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
          'action' => CHECK_COMPANY_FAILURE,
        ],
        [
          'action' => REVENUE_PAY_DIVIDENDS,
          'playerId' => 'some',
          'activePlayerIds' => [Offices::get(CHAIRMAN)->getPlayerId()],
        ],
      ],
    ];

    Engine::setup($this->withPhaseWindows($node, REVENUE), ['method' => 'stSetupEventsInIndia']);
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
        [
          'action' => CHECK_COMPANY_FAILURE,
        ],
      ],
    ];

    Engine::setup($this->withPhaseWindows($node, EVENTS_IN_INDIA), ['method' => 'stSetupParliamentMeets']);
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

    $primeMinisterPlayerId = Parliament::getPrimeMinisterPlayerId();

    Parliament::setSelectingLaw(true);


    $children = [
      [
        'action' => FRONTEND_TRIGGER,
        'args' => [
          TRIGGER => PARLIAMENT_MEETS_START,
        ],
      ],
      [
        'action' => PARLIAMENT_MEETS_SELECT_LAW,
        'playerId' => 'some',
        'activePlayerIds' => [$primeMinisterPlayerId],
      ],
      [
        'action' => PARLIAMENT_MEETS_SELECT_POLICY,
        'playerId' => 'some',
        'activePlayerIds' => [$primeMinisterPlayerId],
      ],
    ];

    $taxCollectordsFamily = LondonSeasonCards::getOwnerFamily(TAX_COLLECTORS_ID);
    if ($taxCollectordsFamily !== null) {
      $children[] = LondonSeasonCards::get(TAX_COLLECTORS_ID)->getTaxCollectorsAction($taxCollectordsFamily->getPlayerId());
    }

    $playerIds = Players::getTurnOrder();

    $children = array_merge($children, [
      [
        'action' => TIMING_WINDOW_CHECK,
        'args' => [
          TIMING_WINDOW => [BEFORE_ANY_VOTES_ARE_CAST],
        ],
      ],
      Parliament::getRoundOfVotingNodes(),
      [
        'action' => PARLIAMENT_MEETS_CLEANUP,
      ]
    ]);


    $node = [
      'children' => $children,
    ];


    Engine::setup($this->withPhaseWindows($node, PARLIAMENT_MEETS), ['method' => 'stSetupUpkeepAndRefresh']);
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
          'action' => TIMING_WINDOW_CHECK,
          'args' => [
            TIMING_WINDOW => [ANY_TIME_AFTER_REVENUE_PHASE],
          ],
        ],
        [
          'action' => PRE_TAX_AND_UPKEEP,
          'args' => [
            'type' => UPKEEP,
          ]
        ],
        [
          'action' => REFRESH_BOARD,
        ],
      ],
    ];

    Engine::setup($this->withPhaseWindows($node, UPKEEP_AND_REFRESH), ['method' => 'stLastRoundCheck']);
    Engine::proceed();
  }

  function stLastRoundCheck()
  {
    $currentTurn = Globals::getTurn();
    $lastRound = Scenarios::get()->getEndTurn() === $currentTurn;

    if ($lastRound) {
      Globals::setEndOfGame(true); // Used to check end of negotiation
      Globals::setTransactionsEnabled(false);
      $node = [
        'children' => $this->getFinalScoringNodes(true),
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

  // .########.####.##....##....###....##......
  // .##........##..###...##...##.##...##......
  // .##........##..####..##..##...##..##......
  // .######....##..##.##.##.##.....##.##......
  // .##........##..##..####.#########.##......
  // .##........##..##...###.##.....##.##......
  // .##.......####.##....##.##.....##.########

  // ..######...######...#######..########..####.##....##..######..
  // .##....##.##....##.##.....##.##.....##..##..###...##.##....##.
  // .##.......##.......##.....##.##.....##..##..####..##.##.......
  // ..######..##.......##.....##.########...##..##.##.##.##...####
  // .......##.##.......##.....##.##...##....##..##..####.##....##.
  // .##....##.##....##.##.....##.##....##...##..##...###.##....##.
  // ..######...######...#######..##.....##.####.##....##..######..

  function getFinalScoringNodes(bool $companySurvived)
  {
    $children = $companySurvived ?
      [
        [
          'action' => LONDON_SEASON_ATTRITION,
          'args' => [
            FINAL_RETIREMENT => true
          ]
        ]
      ] :
      [
        [
          'action' => RESOLVE_COMPANY_FAILURE_CARD,
        ]
      ];


    $children = array_merge(
      $children,
      [
        [
          'action' => FINAL_SCORING,
          'args' => [
            'companySurvived' => $companySurvived,
          ]
        ],
        [
          'action' => PRE_END_OF_GAME,
        ],
      ]
    );




    return $children;
  }


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

    $presidentOffice = $offices[$presidencyOfficeMap[$presidencyId]];
    $commander = $presidentOffice->getCommander();


    // TODO: check if there is a president?:
    $requiredChoiceCount = 0;
    $presidentPlayerId = $presidentOffice->getPlayerId();

    $children = [];

    if ($presidentPlayerId !== null) {
      $requiredChoiceCount++;
      $children[] =
        [
          'action' => PRESIDENCY_PRESIDENT,
          'playerId' => 'some',
          'activePlayerIds' => [$presidentPlayerId],
          'args' => [
            'officeId' => $presidentOffice->getId(),
            'presidencyId' => $presidencyId,
            'presidentPlayerId' => $presidentPlayerId

          ],
        ];
    }

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

    $governorOffices = $presidentOffice->getAssociatedGovernorOffices();
    foreach ($governorOffices as $governorOffice) {
      if ($governorOffice->getFamilyMember() === null) {
        continue;
      }
      $children[] = [
        'action' => PRESIDENCY_GOVERNOR,
        'playerId' => 'some',
        'activePlayerIds' => [$governorOffice->getPlayerId()],
        'args' => [
          'officeId' => $governorOffice->getId(),
          'presidencyId' => $presidencyId,
        ],
      ];
      $requiredChoiceCount++;
    }

    return [
      'children' => [
        [
          'type' => NODE_OR,
          'children' => $children,
          'playerId' => 'some',
          'activePlayerIds' => [$presidentPlayerId ?? Offices::get(CHAIRMAN)->getPlayerId()],
          'requiredChoiceCount' => $requiredChoiceCount,
          'stateDescription' => [
            'descriptionmyturn' => clienttranslate('${presidency}: ${you} must choose who will act next'),
            'description' => clienttranslate('${presidency}: ${actplayer} must choose who will act next'),
            'args' => [
              'presidency' => Notifications::getPhaseName($presidencyId),
            ]
          ],
          'args' => [
            'tab' => 'joco-india'
          ]
          // 'activePlayerIds' => [$presidentOffice->getPlayerId()],
          // 'officeId' => $presidentOffice->getId(),
        ],
      ],
    ];
  }

  private function withPhaseWindows(array $node, string $phaseId, bool $start = true, bool $end = true): array
  {
    $window = fn($type) => [
      'action' => TIMING_WINDOW_CHECK,
      'args' => [TIMING_WINDOW => [$type], TIMING_DATA => [PHASE_ID => $phaseId]],
    ];
    if ($start) {
      array_unshift($node['children'], $window(START_OF_PHASE));
    }
    if ($end) {
      $node['children'][] = $window(END_OF_PHASE);
    }
    return $node;
  }

  private function withOfficeWindows(array $node, string $officeId, bool $before = true, bool $after = true): array
  {
    if ($before) {
      Globals::setOfficeHolderBonus(0);
    }
    $window = fn($type) => [
      'action' => TIMING_WINDOW_CHECK,
      'args' => [TIMING_WINDOW => [$type], TIMING_DATA => [OFFICE_ID => $officeId]],
    ];
    if ($before) {
      array_unshift($node['children'], $window(BEFORE_OFFICE_ACTS));
    }
    if ($after) {
      $node['children'][] = $window(AFTER_OFFICE_FINISHED_ACTING);
    }
    return $node;
  }

  function updatePhase($phase)
  {
    Globals::setPhase($phase);
    Notifications::nextPhase($phase);
  }
}
