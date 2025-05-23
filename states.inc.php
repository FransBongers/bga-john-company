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

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: $this->checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!

require_once 'modules/php/Boilerplate/constants.inc.php';
require_once 'modules/php/constants.inc.php';

$machinestates = [

    // The initial state. Please do not modify.

    1 => array(
        "name" => "gameSetup",
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => ["" => ST_SETUP_DRAFT]
        // "transitions" => ["" => 2]
    ),

    // Note: ID=2 => your first state

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

    ST_RESOLVE_STACK => [
        'name' => 'resolveStack',
        'type' => 'game',
        'action' => 'stResolveStack',
        'transitions' => ['next' => ST_RESOLVE_STACK],
    ],

    ST_CONFIRM_TURN => [
        'name' => 'confirmTurn',
        'description' => clienttranslate('${actplayer} must confirm or restart their turn'),
        'descriptionmyturn' => clienttranslate('${you} must confirm or restart your turn'),
        'type' => 'activeplayer',
        'args' => 'argsConfirmTurn',
        'action' => 'stConfirmTurn',
        'possibleactions' => ['actConfirmTurn', 'actRestart'],
        'transitions' => [
            // 'breakStart' => ST_BREAK_MULTIACTIVE
        ],
    ],

    ST_CONFIRM_PARTIAL_TURN => [
        'name' => 'confirmPartialTurn',
        'description' => clienttranslate('${actplayer} must confirm the switch of player'),
        'descriptionmyturn' => clienttranslate('${you} must confirm the switch of player. You will not be able to restart turn'),
        'type' => 'activeplayer',
        'args' => 'argsConfirmTurn',
        // 'action' => 'stConfirmPartialTurn',
        'possibleactions' => ['actConfirmPartialTurn', 'actRestart'],
    ],

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

    ST_NEW_COMPANY_SHARES => [
        'name' => NEW_COMPANY_SHARES,
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_ENLIST_OFFICER => [
        'name' => ENLIST_OFFICER,
        'type' => 'multipleactiveplayer',
        'description' => clienttranslate('${actplayer} must enlist an officer'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actEnlistOfficer', 'actTakeAtomicAction'],
        'transitions' => ['next' => ST_RESOLVE_STACK],
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
        'possibleactions' => ['act' . PARLIAMENT_MEETS, 'actTakeAtomicAction'],
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
];
