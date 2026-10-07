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

    ST_MILITARY_AFFAIRS_CHECK_COMMANDER => [
        'name' => MILITARY_AFFAIRS_CHECK_COMMANDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PRESIDENCY_DECIDE_ORDER => [
        'name' => PRESIDENCY_DECIDE_ORDER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PRESIDENCY_DECIDE_ORDER, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK, BONUSES],
    ],

    ST_PRESIDENCY_TRADE => [
        'name' => PRESIDENCY_TRADE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PRESIDENCY_TRADE, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PRESIDENCY_TRADE_FILL_ORDERS => [
        'name' => PRESIDENCY_TRADE_FILL_ORDERS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PRESIDENCY_TRADE_FILL_ORDERS, 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_PRESIDENCY_COMMANDER => [
        'name' => PRESIDENCY_COMMANDER,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_COMMANDER_PURCHASE_LOCAL_ALLIANCE => [
        'name' => COMMANDER_PURCHASE_LOCAL_ALLIANCE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . COMMANDER_PURCHASE_LOCAL_ALLIANCE, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_COMMANDER_APPROVE_LOCAL_ALLIANCE => [
        'name' => COMMANDER_APPROVE_LOCAL_ALLIANCE,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
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

    ST_PARLIAMENT_MEETS => [
        'name' => PARLIAMENT_MEETS,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer}'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['act' . PARLIAMENT_MEETS, 'actPassOptionalAction', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_FOREIGN_INVASION => [
        'name' => FOREIGN_INVASION,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_FOREIGN_INVASION_END => [
        'name' => FOREIGN_INVASION_END,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_UPKEEP_CHECK_PRIZES => [
        'name' => UPKEEP_CHECK_PRIZES,
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

    ST_GOVERNOR_BUILD_COMPANY_SHIP => [
        'name' => GOVERNOR_BUILD_COMPANY_SHIP,
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
