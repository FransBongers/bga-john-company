<?php

/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * JohnCompany implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * states.inc.php
 *
 * JohnCompany game states description
 *
 */

use Bga\GameFramework\GameStateBuilder;
use Bga\GameFramework\StateType;

$machinestates = [


    2 => [
        "name" => "PlayerTurn",
        "description" => clienttranslate('${actplayer} must select a card'),
        "descriptionmyturn" => clienttranslate('${you} must play a card or pass'),
        "type" => "activeplayer",
        "args" => "argPlayerTurn",
        "possibleactions" => [
            // these actions are called from the front with bgaPerformAction, and matched to the function on the game.php file
            "actPlayCard",
            "actPass",
        ],
        "transitions" => ["playCard" => 3, "pass" => 3]
    ],

    3 => [
        "name" => "nextPlayer",
        "description" => '',
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,
        "transitions" => ["endGame" => 99, "nextPlayer" => 2]
    ],

    // .########.##....##..######...####.##....##.########
    // .##.......###...##.##....##...##..###...##.##......
    // .##.......####..##.##.........##..####..##.##......
    // .######...##.##.##.##...####..##..##.##.##.######..
    // .##.......##..####.##....##...##..##..####.##......
    // .##.......##...###.##....##...##..##...###.##......
    // .########.##....##..######...####.##....##.########

    ST_RESOLVE_STACK => GameStateBuilder::create()
        ->name(RESOLVE_STACK)
        ->description('')
        ->type(StateType::GAME)
        ->action('stResolveStack')
        ->build(),

    ST_CONFIRM_TURN => GameStateBuilder::create()
        ->name(CONFIRM_TURN)
        ->description(clienttranslate('${actplayer} must confirm or restart their turn'))
        ->descriptionmyturn(clienttranslate('${you} must confirm or restart your turn'))
        ->type(StateType::ACTIVE_PLAYER)
        ->args('argsConfirmTurn')
        ->action('stConfirmTurn')
        ->possibleactions([
            'actConfirmTurn',
            // these actions are called from the front with bgaPerformAction, and matched to the function on the game.php file
            'act' . CONFIRM_TURN,
            'actRestart',
            'actUndoToStep',
        ])
        ->build(),

    ST_CONFIRM_PARTIAL_TURN => GameStateBuilder::create()
        ->name(CONFIRM_PARTIAL_TURN)
        ->description(clienttranslate('${actplayer} must confirm their moves'))
        ->descriptionmyturn(clienttranslate('${you} must confirm your moves. You will not be able to undo'))
        ->type(StateType::ACTIVE_PLAYER)
        ->args('argsConfirmTurn')
        ->action('stConfirmTurn')
        ->possibleactions([
            // these actions are called from the front with bgaPerformAction, and matched to the function on the game.php file
            'act' . CONFIRM_PARTIAL_TURN,
            'actRestart',
            'actUndoToStep',
        ])
        ->build(),

    ST_RESOLVE_CHOICE => GameStateBuilder::create()
        ->name(RESOLVE_CHOICE)
        ->description(clienttranslate('${actplayer} must choose which effect to resolve'))
        ->descriptionmyturn(clienttranslate('${you} must choose which effect to resolve'))
        // ->descriptionxor(clienttranslate('${actplayer} must choose exactly one effect'))
        // ->descriptionmyturnxor(clienttranslate('${you} must choose exactly one effect'))
        ->type(StateType::ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions(['actChooseAction', 'actRestart', 'actUndoToStep',])
        ->transitions([])
        ->build(),

    ST_HIRING_CHOOSE_CHAIRMAN => GameStateBuilder::create()
        ->name(HIRING_CHOOSE_CHAIRMAN)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . HIRING_CHOOSE_CHAIRMAN,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_TRADE_IN_CHINA => GameStateBuilder::create()
        ->name(TRADE_IN_CHINA)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . TRADE_IN_CHINA,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_TIMING_WINDOW_ACT => GameStateBuilder::create()
        ->name(TIMING_WINDOW_ACT)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . TIMING_WINDOW_ACT,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_TRADE_OR_DISCARD_ITEMS => GameStateBuilder::create()
        ->name(TRADE_OR_DISCARD_ITEMS)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . TRADE_OR_DISCARD_ITEMS,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_WAR_AGAINST_FRANCE => GameStateBuilder::create()
        ->name(WAR_AGAINST_FRANCE)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . WAR_AGAINST_FRANCE,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_MOVE_ELEPHANT => GameStateBuilder::create()
        ->name(MOVE_ELEPHANT)
        ->description('${actplayer}')
        ->descriptionmyturn('${you}')
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . MOVE_ELEPHANT,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_PLACE_SHIP_IN_SEA_ZONE => GameStateBuilder::create()
        ->name(PLACE_SHIP_IN_SEA_ZONE)
        ->description('')
        ->type(StateType::GAME)
        ->action('stAtomicAction')
        ->build(),

    ST_PLACE_REGIMENT_IN_ARMY => GameStateBuilder::create()
        ->name(PLACE_REGIMENT_IN_ARMY)
        ->description('')
        ->type(StateType::GAME)
        ->action('stAtomicAction')
        ->build(),

    ST_PLACE_UNREST_IN_REGION => GameStateBuilder::create()
        ->name(PLACE_UNREST_IN_REGION)
        ->description('')
        ->type(StateType::GAME)
        ->action('stAtomicAction')
        ->build(),

    ST_CHOOSE_FAMILY_MEMBER => GameStateBuilder::create()
        ->name(CHOOSE_FAMILY_MEMBER)
        ->description('')
        ->type(StateType::GAME)
        ->action('stAtomicAction')
        ->build(),

    // .########.##....##.########......#######..########
    // .##.......###...##.##.....##....##.....##.##......
    // .##.......####..##.##.....##....##.....##.##......
    // .######...##.##.##.##.....##....##.....##.######..
    // .##.......##..####.##.....##....##.....##.##......
    // .##.......##...###.##.....##....##.....##.##......
    // .########.##....##.########......#######..##......

    // ..######......###....##.....##.########
    // .##....##....##.##...###...###.##......
    // .##.........##...##..####.####.##......
    // .##...####.##.....##.##.###.##.######..
    // .##....##..#########.##.....##.##......
    // .##....##..##.....##.##.....##.##......
    // ..######...##.....##.##.....##.########

    ST_PRE_END_GAME => [
        'name' => 'preEndGame',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    // Final state.
    // Please do not modify (and do not overload action/args methods).
    ST_END_GAME => [
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    ],

    // ....###....########..#######..##.....##.####..######.
    // ...##.##......##....##.....##.###...###..##..##....##
    // ..##...##.....##....##.....##.####.####..##..##......
    // .##.....##....##....##.....##.##.###.##..##..##......
    // .#########....##....##.....##.##.....##..##..##......
    // .##.....##....##....##.....##.##.....##..##..##....##
    // .##.....##....##.....#######..##.....##.####..######.

    // ....###.....######..########.####..#######..##....##..######.
    // ...##.##...##....##....##.....##..##.....##.###...##.##....##
    // ..##...##..##..........##.....##..##.....##.####..##.##......
    // .##.....##.##..........##.....##..##.....##.##.##.##..######.
    // .#########.##..........##.....##..##.....##.##..####.......##
    // .##.....##.##....##....##.....##..##.....##.##...###.##....##
    // .##.....##..######.....##....####..#######..##....##..######.

    ST_SETUP_DRAFT => [
        'name' => 'SetupDraft',
        'description' => '',
        'type' => 'game',
        'action' => 'stSetupDraft',
    ],

    ST_DRAFT_CARD => [
        'name' => DRAFT_CARD,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('All players must draft a card'),
        'descriptionmyturn' => clienttranslate('${you} must draft a card'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actDraftCard', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_DRAFT_CARD_NEXT_STEP => [
        'name' => ST_DRAFT_CARD_NEXT_STEP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PERFORM_SETUP => [
        'name' => PERFORM_SETUP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_FAMILY_ACTION => [
        'name' => FAMILY_ACTION,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must perform a family action'),
        'descriptionmyturn' => clienttranslate('${you} must select a family action'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actFamilyAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],


    ST_PURCHASE_ENTERPRISE => [
        'name' => PURCHASE_ENTERPRISE,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_NEW_COMPANY_SHARES => [
        'name' => NEW_COMPANY_SHARES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_ENLIST_OFFICER => [
        'name' => ENLIST_OFFICER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_ENLIST_WRITER => [
        'name' => ENLIST_WRITER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must enlist a writer'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actEnlistWriter', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_SEEK_SHARE => [
        'name' => SEEK_SHARE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must seek a share'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . SEEK_SHARE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],


    ST_CHAIRMAN => [
        'name' => CHAIRMAN,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CHAIRMAN, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CHAIRMAN_DEBT_CONSENT => [
        'name' => CHAIRMAN_DEBT_CONSENT,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CHAIRMAN_DEBT_CONSENT, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY => [
        'name' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . DIRECTOR_OF_TRADE_SPECIAL_ENVOY, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS => [
        'name' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_DIRECTOR_OF_TRADE_TRANSFERS => [
        'name' => DIRECTOR_OF_TRADE_TRANSFERS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . DIRECTOR_OF_TRADE_TRANSFERS, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_MANAGER_OF_SHIPPING => [
        'name' => MANAGER_OF_SHIPPING,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . MANAGER_OF_SHIPPING, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_CHAIRMAN_SEEK_DEBT => [
        'name' => CROWN_CHAIRMAN_SEEK_DEBT,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_CROWN_CHAIRMAN_REQUEST_DEBT_ADVANCEMENT => [
        'name' => CROWN_CHAIRMAN_REQUEST_DEBT_ADVANCEMENT,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_CHAIRMAN_REQUEST_DEBT_ADVANCEMENT, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_CHAIRMAN_REQUEST_ALLOCATION => [
        'name' => CROWN_CHAIRMAN_REQUEST_ALLOCATION,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_CHAIRMAN_REQUEST_ALLOCATION, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_CHAIRMAN_ALLOCATE_COMPANY_BALANCE => [
        'name' => CROWN_CHAIRMAN_ALLOCATE_COMPANY_BALANCE,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_CROWN_MANAGER_OF_SHIPPING_FIT_SHIPS => [
        'name' => CROWN_MANAGER_OF_SHIPPING_FIT_SHIPS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_MANAGER_OF_SHIPPING_FIT_SHIPS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_MANAGER_OF_SHIPPING_BUY_COMPANY_SHIPS => [
        'name' => CROWN_MANAGER_OF_SHIPPING_BUY_COMPANY_SHIPS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_MANAGER_OF_SHIPPING_BUY_COMPANY_SHIPS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_MANAGER_OF_SHIPPING_LEASE_EXTRA_SHIPS => [
        'name' => CROWN_MANAGER_OF_SHIPPING_LEASE_EXTRA_SHIPS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_MANAGER_OF_SHIPPING_LEASE_EXTRA_SHIPS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CROWN_MANAGER_OF_SHIPPING_PLACE_SHIPS => [
        'name' => CROWN_MANAGER_OF_SHIPPING_PLACE_SHIPS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . CROWN_MANAGER_OF_SHIPPING_PLACE_SHIPS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_MILITARY_AFFAIRS_TRANSFERS => [
        'name' => MILITARY_AFFAIRS_TRANSFERS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . MILITARY_AFFAIRS_TRANSFERS, 'actPassOptionalAction',  'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_MILITARY_AFFAIRS_ASSIGN => [
        'name' => MILITARY_AFFAIRS_ASSIGN,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . MILITARY_AFFAIRS_ASSIGN, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_MILITARY_AFFAIRS_ASSIGN_COMMANDER => [
        'name' => MILITARY_AFFAIRS_ASSIGN_COMMANDER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . MILITARY_AFFAIRS_ASSIGN_COMMANDER, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_GOVERNOR_ADMINISTER => [
        'name' => GOVERNOR_ADMINISTER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . GOVERNOR_ADMINISTER, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_GOVERNOR_GENERAL_MAKE_CHECK => [
        'name' => GOVERNOR_GENERAL_MAKE_CHECK,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . GOVERNOR_GENERAL_MAKE_CHECK, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_MILITARY_AFFAIRS_CHECK_COMMANDER => [
        'name' => MILITARY_AFFAIRS_CHECK_COMMANDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    // ST_PRESIDENCY_DECIDE_ORDER => [
    //     'name' => PRESIDENCY_DECIDE_ORDER,
    //     'type' => 'multipleactiveplayer',
    //     'description' => clienttranslate('${actplayer}'),
    //     'descriptionmyturn' => clienttranslate('${you}'),
    //     'args' => 'argsAtomicAction',
    //     'action' => 'stAtomicAction',
    //     'possibleactions' => ['act' . PRESIDENCY_DECIDE_ORDER, 'actTakeAtomicAction'],
    //     'transitions' => ['next' => ST_RESOLVE_STACK, BONUSES],
    // ],

    ST_PRESIDENT_TRADE => [
        'name' => PRESIDENT_TRADE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PRESIDENT_TRADE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PRESIDENT_TRADE_FILL_ORDERS => [
        'name' => PRESIDENT_TRADE_FILL_ORDERS,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PRESIDENT_TRADE_FILL_ORDERS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PRESIDENT_TRADE_RESOLVE_CHECK => [
        'name' => PRESIDENT_TRADE_RESOLVE_CHECK,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PARLIAMENT_MEETS_SELECT_LAW => [
        'name' => PARLIAMENT_MEETS_SELECT_LAW,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS_SELECT_LAW, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PARLIAMENT_MEETS_SELECT_POLICY => [
        'name' => PARLIAMENT_MEETS_SELECT_POLICY,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you} must confirm the selected policy',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS_SELECT_POLICY, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PARLIAMENT_MEETS_RESOLVE_POLICY => [
        'name' => PARLIAMENT_MEETS_RESOLVE_POLICY,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PARLIAMENT_MEETS_RESOLVE_LAW => [
        'name' => PARLIAMENT_MEETS_RESOLVE_LAW,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PARLIAMENT_MEETS_CLEANUP => [
        'name' => PARLIAMENT_MEETS_CLEANUP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PARLIAMENT_MEETS_CAST_VOTES => [
        'name' => PARLIAMENT_MEETS_CAST_VOTES,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS_CAST_VOTES, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PARLIAMENT_MEETS_ADDITIONAL_ROUND_OR_RESOLVE => [
        'name' => PARLIAMENT_MEETS_ADDITIONAL_ROUND_OR_RESOLVE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS_ADDITIONAL_ROUND_OR_RESOLVE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PARLIAMENT_MEETS_COMMIT_TO_OPPOSITION => [
        'name' => PARLIAMENT_MEETS_COMMIT_TO_OPPOSITION,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS_COMMIT_TO_OPPOSITION, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_SWAP_POWER_MARKERS => [
        'name' => SWAP_POWER_MARKERS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must perform an action'),
        'descriptionmyturn' => clienttranslate('${you} must perform an action'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . SWAP_POWER_MARKERS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_TAX_AND_UPKEEP => [
        'name' => TAX_AND_UPKEEP,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must perform an action'),
        'descriptionmyturn' => clienttranslate('${you} must perform an action'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . TAX_AND_UPKEEP, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PRESIDENCY_COMMANDER => [
        'name' => PRESIDENCY_COMMANDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PRESIDENCY_GOVERNOR => [
        'name' => PRESIDENCY_GOVERNOR,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PRESIDENCY_PRESIDENT => [
        'name' => PRESIDENCY_PRESIDENT,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_SELECT_OFFICE_HOLDER => [
        'name' => SELECT_OFFICE_HOLDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_USE_TAX_COLLECTORS => [
        'name' => USE_TAX_COLLECTORS,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_USE_MAN_ON_THE_INSIDE => [
        'name' => USE_MAN_ON_THE_INSIDE,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . USE_MAN_ON_THE_INSIDE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_COMMANDER_PURCHASE_LOCAL_ALLIANCE => [
        'name' => COMMANDER_PURCHASE_LOCAL_ALLIANCE,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . COMMANDER_PURCHASE_LOCAL_ALLIANCE, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_COMMANDER_APPROVE_LOCAL_ALLIANCE => [
        'name' => COMMANDER_APPROVE_LOCAL_ALLIANCE,
        'type' => 'multipleactiveplayer',
        'description' => '${actplayer}',
        'descriptionmyturn' => '${you}',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . COMMANDER_APPROVE_LOCAL_ALLIANCE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_COMMANDER_DEPLOY => [
        'name' => COMMANDER_DEPLOY,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . COMMANDER_DEPLOY, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_COMMANDER_DEPLOY_RESOLVE_CHECK => [
        'name' => COMMANDER_DEPLOY_RESOLVE_CHECK,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BONUSES => [
        'name' => BONUSES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_REVENUE_EXPENSES => [
        'name' => REVENUE_EXPENSES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_REVENUE_EMERGENCY_LOANS => [
        'name' => REVENUE_EMERGENCY_LOANS,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_REVENUE_CHECK_EXPECTATIONS => [
        'name' => REVENUE_CHECK_EXPECTATIONS,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_REVENUE_PAY_DIVIDENDS => [
        'name' => REVENUE_PAY_DIVIDENDS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . REVENUE_PAY_DIVIDENDS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_REVENUE_ROYAL_PARDON => [
        'name' => REVENUE_ROYAL_PARDON,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . REVENUE_ROYAL_PARDON, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_USE_ROYAL_PROTECTION => [
        'name' => USE_ROYAL_PROTECTION,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_STORMS => [
        'name' => EVENTS_IN_INDIA_STORMS,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_RESOLVE_EVENT => [
        'name' => EVENTS_IN_INDIA_RESOLVE_EVENT,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_RESOLVE_CRISIS => [
        'name' => EVENTS_IN_INDIA_RESOLVE_CRISIS,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_ELEPHANT_MARCH => [
        'name' => EVENTS_IN_INDIA_ELEPHANT_MARCH,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_SETUP_SECONDARY_REBELLION => [
        'name' => EVENTS_IN_INDIA_SETUP_SECONDARY_REBELLION,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_CLEAR_CASCADE => [
        'name' => CLEAR_CASCADE,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_EVENTS_IN_INDIA_CRISIS_DEFENSE => [
        'name' => EVENTS_IN_INDIA_CRISIS_DEFENSE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . EVENTS_IN_INDIA_CRISIS_DEFENSE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_UPKEEP_CHECK_PRIZES => [
        'name' => UPKEEP_CHECK_PRIZES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_CHECK_COMPANY_FAILURE => [
        'name' => CHECK_COMPANY_FAILURE,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_RESOLVE_COMPANY_FAILURE_CARD => [
        'name' => RESOLVE_COMPANY_FAILURE_CARD,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_TIMING_WINDOW_CHECK => [
        'name' => TIMING_WINDOW_CHECK,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_HIRING_CHECK_VACANT_OFFICES => [
        'name' => HIRING_CHECK_VACANT_OFFICES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_HIRING_CHAIRMAN => [
        'name' => HIRING_CHAIRMAN,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must complete the chairman hiring step'),
        'descriptionmyturn' => clienttranslate('${you} must complete the chairman hiring step'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . HIRING_CHAIRMAN, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_HIRING_HIRE_FAMILY_MEMBER => [
        'name' => HIRING_HIRE_FAMILY_MEMBER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} may hire a family member'),
        'descriptionmyturn' => clienttranslate('${you} may hire a family member'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . HIRING_HIRE_FAMILY_MEMBER, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_HIRING_GIVE_CONSENT_FOR_NEPOTISM => GameStateBuilder::create()
        ->name(HIRING_GIVE_CONSENT_FOR_NEPOTISM)
        ->description(clienttranslate('${actplayer} must give consent for nepotism'))
        ->descriptionmyturn(clienttranslate('${you} must give consent for nepotism'))
        ->type(StateType::MULTIPLE_ACTIVE_PLAYER)
        ->args('argsAtomicAction')
        ->action('stAtomicAction')
        ->possibleactions([
            'act' . HIRING_GIVE_CONSENT_FOR_NEPOTISM,
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ])
        ->transitions(['next' => ST_RESOLVE_STACK])
        ->build(),

    ST_REFRESH_BOARD => [
        'name' => \REFRESH_BOARD,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_FINAL_SCORING => [
        'name' => FINAL_SCORING,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PRE_END_OF_GAME => [
        'name' => PRE_END_OF_GAME,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_BUILD_COMPANY_SHIP => [
        'name' => GOVERNOR_BUILD_COMPANY_SHIP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_GENERAL_SHIPBUILDING => [
        'name' => GOVERNOR_GENERAL_SHIPBUILDING,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_GENERAL_COMMISSION_REGIMENT => [
        'name' => GOVERNOR_GENERAL_COMMISSION_REGIMENT,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_GENERAL_TAX => [
        'name' => GOVERNOR_GENERAL_TAX,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_COMMISSION_REGIMENT => [
        'name' => GOVERNOR_COMMISSION_REGIMENT,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_GOVERNOR_TAX => [
        'name' => GOVERNOR_TAX,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PRE_TAX_AND_UPKEEP => [
        'name' => PRE_TAX_AND_UPKEEP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_ADD_CASH => [
        'name' => ADD_CASH,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_ADD_UNREST => [
        'name' => ADD_UNREST,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_FRONTEND_TRIGGER => [
        'name' => FRONTEND_TRIGGER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_LONDON_SEASON_ATTRITION => [
        'name' => LONDON_SEASON_ATTRITION,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_LONDON_SEASON_ORDER => [
        'name' => LONDON_SEASON_ORDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_LONDON_SEASON_CLEANUP => [
        'name' => LONDON_SEASON_CLEANUP,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_LONDON_SEASON_RETIRE => [
        'name' => LONDON_SEASON_RETIRE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} may retire a family member'),
        'descriptionmyturn' => clienttranslate('${you} may retire a family member'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => [
            'actLondonSeasonRetire',
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_LONDON_SEASON_CHOOSE_CARD => [
        'name' => LONDON_SEASON_CHOOSE_CARD,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must choose a card'),
        'descriptionmyturn' => clienttranslate('${you} must choose a card'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => [
            'actLondonSeasonChooseCard',
            'actPass',
            'actPassOptionalAction',
            'actTakeAtomicAction',
            'actUndoToStep',
        ],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],
];
