<?php
/*
* ENGINE
*/
const NODE_SEQ = 'seq';
const NODE_OR = 'or';
const NODE_XOR = 'xor';
const NODE_PARALLEL = 'parallel';
const NODE_LEAF = "leaf";

const ZOMBIE = 98;
const PASS = 99;


const ST_GAME_SETUP = 1;
const ST_GAME_SETUP_NAME = 'gameSetup';
// Boiler plate
const ST_BEFORE_START_OF_TURN = 6;
const ST_TURNACTION = 7;
const ST_RESOLVE_STACK = 90;
const ST_RESOLVE_CHOICE = 91;
const ST_IMPOSSIBLE_MANDATORY_ACTION = 92;
const ST_CONFIRM_TURN = 93;
const ST_CONFIRM_PARTIAL_TURN = 94;
const ST_GENERIC_NEXT_PLAYER = 95;
const ST_PRE_END_GAME = 98;
const ST_END_GAME = 99;
const ST_END_GAME_NAME = 'gameEnd';

const ST_CLEANUP = 88; // TODO: replace

const LOG_PHASE = 'LogPhase';
const RESOLVE_STACK = 'resolveStack';
const RESOLVE_CHOICE = 'ResolveChoice';
const START_GAME_ENGINE = 'StartGameEngine';
const CONFIRM_TURN = 'ConfirmTurn';
const CONFIRM_PARTIAL_TURN = 'ConfirmPartialTurn';
const GENERIC_NEXT_PLAYER = 'genericNextPlayer';
const PRE_END_GAME = 'preEndGame';