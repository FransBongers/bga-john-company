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
 * Game.php
 *
 * This is the main file for your game logic.
 *
 * In this PHP file, you are going to defines the rules of the game.
 */

declare(strict_types=1);

namespace Bga\Games\JohnCompany;

require_once(APP_GAMEMODULE_PATH . "module/table/table.game.php");

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Stats;
use Bga\Games\JohnCompany\Managers\AICards;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Elephant;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PrimeMinister;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Scenarios;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Enterprise;

class Game extends \Table
{
    use \Bga\Games\JohnCompany\DebugTrait;
    use \Bga\Games\JohnCompany\EngineTrait;
    use \Bga\Games\JohnCompany\TurnTrait;

    public static $instance = null;
    public function __construct()
    {
        parent::__construct();

        self::$instance = $this;
        $this->initGameStateLabels([
            'logging' => 10,
        ]);
        Engine::boot();
        // Stats::checkExistence();

        /* example of notification decorator.
        // automatically complete notification args when needed
        $this->notify->addDecorator(function(string $message, array $args) {
            if (isset($args['player_id']) && !isset($args['player_name']) && str_contains($message, '${player_name}')) {
                $args['player_name'] = $this->getPlayerNameById($args['player_id']);
            }
        
            if (isset($args['card_id']) && !isset($args['card_name']) && str_contains($message, '${card_name}')) {
                $args['card_name'] = self::$CARD_TYPES[$args['card_id']]['card_name'];
                $args['i18n'][] = ['card_name'];
            }
            
            return $args;
        });*/
    }

    // .########...#######..####.##.......########.########.
    // .##.....##.##.....##..##..##.......##.......##.....##
    // .##.....##.##.....##..##..##.......##.......##.....##
    // .########..##.....##..##..##.......######...########.
    // .##.....##.##.....##..##..##.......##.......##...##..
    // .##.....##.##.....##..##..##.......##.......##....##.
    // .########...#######..####.########.########.##.....##

    // .########..##..........###....########.########
    // .##.....##.##.........##.##......##....##......
    // .##.....##.##........##...##.....##....##......
    // .########..##.......##.....##....##....######..
    // .##........##.......#########....##....##......
    // .##........##.......##.....##....##....##......
    // .##........########.##.....##....##....########

    public static function get()
    {
        return self::$instance;
    }

    // Exposing protected method getCurrentPlayerId
    public function getCurrentPId()
    {
        return $this->getCurrentPlayerId();
    }

    // Exposing protected method translation
    public static function translate($text)
    {
        return self::_($text);
    }

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ////////////   Custom Turn Order   ////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    public function initCustomTurnOrder($key, $order, $callback, $endCallback, $loop = false, $autoNext = true, $args = [])
    {
        $turnOrders = Globals::getCustomTurnOrders();
        $turnOrders[$key] = [
            'order' => $order ?? Players::getTurnOrder(),
            'index' => -1,
            'callback' => $callback,
            'args' => $args, // Useful mostly for auto card listeners
            'endCallback' => $endCallback,
            'loop' => $loop,
        ];
        Globals::setCustomTurnOrders($turnOrders);

        if ($autoNext) {
            $this->nextPlayerCustomOrder($key);
        }
    }

    public function initCustomDefaultTurnOrder($key, $callback, $endCallback, $loop = false, $autoNext = true)
    {
        $this->initCustomTurnOrder($key, null, $callback, $endCallback, $loop, $autoNext);
    }

    public function nextPlayerCustomOrder($key)
    {
        $turnOrders = Globals::getCustomTurnOrders();
        if (!isset($turnOrders[$key])) {
            throw new \BgaVisibleSystemException('Asking for the next player of a custom turn order not initialized : ' . $key);
        }

        // Increase index and save
        $o = $turnOrders[$key];
        $i = $o['index'] + 1;
        if ($i == count($o['order']) && $o['loop']) {
            $i = 0;
        }
        $turnOrders[$key]['index'] = $i;
        Globals::setCustomTurnOrders($turnOrders);

        if ($i < count($o['order'])) {
            $this->gamestate->jumpToState(ST_GENERIC_NEXT_PLAYER);
            $this->gamestate->changeActivePlayer($o['order'][$i]);
            $this->jumpToOrCall($o['callback'], $o['args']);
        } else {
            $this->endCustomOrder($key);
        }
    }

    public function endCustomOrder($key)
    {
        $turnOrders = Globals::getCustomTurnOrders();
        if (!isset($turnOrders[$key])) {
            throw new \BgaVisibleSystemException('Asking for ending a custom turn order not initialized : ' . $key);
        }

        $o = $turnOrders[$key];
        $turnOrders[$key]['index'] = count($o['order']);
        Globals::setCustomTurnOrders($turnOrders);
        $callback = $o['endCallback'];
        $this->jumpToOrCall($callback);
    }

    public function jumpToOrCall($mixed, $args = [])
    {
        if (is_int($mixed) && array_key_exists($mixed, $this->gamestate->states)) {
            $this->gamestate->jumpToState($mixed);
        } elseif (method_exists($this, $mixed)) {
            $method = $mixed;
            $this->$method($args);
        } else {
            throw new \BgaVisibleSystemException('Failing to jumpToOrCall  : ' . $mixed);
        }
    }

    // .########.##....##.########.....########..########.
    // .##.......###...##.##.....##....##.....##.##.....##
    // .##.......####..##.##.....##....##.....##.##.....##
    // .######...##.##.##.##.....##....########..########.
    // .##.......##..####.##.....##....##.....##.##.......
    // .##.......##...###.##.....##....##.....##.##.......
    // .########.##....##.########.....########..##.......

    /**
     * Player action, example content.
     *
     * In this scenario, each time a player plays a card, this method will be called. This method is called directly
     * by the action trigger on the front side with `bgaPerformAction`.
     *
     * @throws BgaUserException
     */
    // public function actPlayCard(int $card_id): void
    // {
    //     // Retrieve the active player ID.
    //     $player_id = (int)$this->getActivePlayerId();

    //     // check input values
    //     $args = $this->argPlayerTurn();
    //     $playableCardsIds = $args['playableCardsIds'];
    //     if (!in_array($card_id, $playableCardsIds)) {
    //         throw new \BgaUserException('Invalid card choice');
    //     }

    //     // Add your game logic to play a card here.
    //     $card_name = self::$CARD_TYPES[$card_id]['card_name'];

    //     // Notify all players about the card played.
    //     $this->notify->all("cardPlayed", clienttranslate('${player_name} plays ${card_name}'), [
    //         "player_id" => $player_id,
    //         "player_name" => $this->getActivePlayerName(), // remove this line if you uncomment notification decorator
    //         "card_name" => $card_name, // remove this line if you uncomment notification decorator
    //         "card_id" => $card_id,
    //         "i18n" => ['card_name'], // remove this line if you uncomment notification decorator
    //     ]);

    //     // at the end of the action, move to the next state
    //     $this->gamestate->nextState("playCard");
    // }

    // public function actPass(): void
    // {
    //     // Retrieve the active player ID.
    //     $player_id = (int)$this->getActivePlayerId();

    //     // Notify all players about the choice to pass.
    //     $this->notify->all("pass", clienttranslate('${player_name} passes'), [
    //         "player_id" => $player_id,
    //         "player_name" => $this->getActivePlayerName(), // remove this line if you uncomment notification decorator
    //     ]);

    //     // at the end of the action, move to the next state
    //     $this->gamestate->nextState("pass");
    // }

    /**
     * Game state arguments, example content.
     *
     * This method returns some additional information that is very specific to the `playerTurn` game state.
     *
     * @return array
     * @see ./states.inc.php
     */
    public function argPlayerTurn(): array
    {
        // Get some values from the current game situation from the database.

        return [
            "playableCardsIds" => [1, 2],
        ];
    }

    /**
     * Compute and return the current game progression.
     *
     * The number returned must be an integer between 0 and 100.
     *
     * This method is called each time we are in a game state with the "updateGameProgression" property set to true.
     *
     * @return int
     * @see ./states.inc.php
     */
    public function getGameProgression()
    {
        // TODO: compute and return the game progression

        return 0;
    }

    /**
     * Game state action, example content.
     *
     * The action method of state `nextPlayer` is called everytime the current game state is set to `nextPlayer`.
     */
    public function stNextPlayer(): void
    {
        // Retrieve the active player ID.
        $player_id = (int)$this->getActivePlayerId();

        // Give some extra time to the active player when he completed an action
        $this->giveExtraTime($player_id);

        $this->activeNextPlayer();

        // Go to another gamestate
        // Here, we would detect if the game is over, and in this case use "endGame" transition instead 
        $this->gamestate->nextState("nextPlayer");
    }

    /**
     * Migrate database.
     *
     * You don't have to care about this until your game has been published on BGA. Once your game is on BGA, this
     * method is called everytime the system detects a game running with your old database scheme. In this case, if you
     * change your database scheme, you just have to apply the needed changes in order to update the game database and
     * allow the game to continue to run with your new version.
     *
     * @param int $from_version
     * @return void
     */
    public function upgradeTableDb($from_version)
    {
        //       if ($from_version <= 1404301345)
        //       {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
        //            $this->applyDbUpgradeToAllDB( $sql );
        //       }
        //
        //       if ($from_version <= 1405061421)
        //       {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
        //            $this->applyDbUpgradeToAllDB( $sql );
        //       }
    }

    /*
     * Gather all information about current game situation (visible by the current player).
     *
     * The method is called each time the game interface is displayed to a player, i.e.:
     *
     * - when the game starts
     * - when a player refreshes the game page (F5)
     */
    public function getAllDatas($playerId = null): array
    {
        $playerId = $playerId ?? Players::getCurrentId();

        $data = [
            'gameOptions' => [
                'crownEnabled' => Globals::getCrownInGame(),
            ],
            'turn' => Globals::getTurn(),
            'phase' => Globals::getPhase(),
            'armyPieces' => ArmyPieces::getAll(),
            'company' => Company::get(),
            'elephant' => Elephant::get(),
            'enterprises' => Enterprises::getAll(),
            'families' => Families::getAll(),
            'familyMembers' => FamilyMembers::getAll(),
            'offices' => Offices::getAll(),
            'orders' => Orders::getAll(),
            'playerOrder' => Players::getTurnOrder($playerId),
            'players' => Players::getUiData($playerId),
            'powerTokens' => Globals::getPowerTokens(),
            'regions' => Regions::getAll(),
            'ships' => Ships::getAll(),
            'staticData' => [
                'orders' => Orders::getStaticUiData(),
                'regions' => Regions::getStaticUiData(),
                'setupCards' => SetupCards::getStaticUiData(),
            ]
        ];

        if (Globals::getCrownInGame()) {
            $data['crown'] = Crown::get();
        }

        return $data;
    }

    /**
     * Returns the game name.
     *
     * IMPORTANT: Please do not modify.
     */
    protected function getGameName()
    {
        return "johncompany";
    }

    /**
     * This method is called only once, when a new game is launched. In this method, you must setup the game
     *  according to the game rules, so that the game is ready to be played.
     */
    protected function setupNewGame($players, $options = [])
    {
        Globals::setupNewGame($players, $options);

        Players::setupNewGame($players, $options);

        $players = Players::getAll()->toArray();

        Scenarios::setupNewGame($players, $options);
        ArmyPieces::setupNewGame();
        Elephant::setupNewGame();
        Enterprises::setupNewGame();
        EventTiles::setupNewGame();
        Families::setupNewGame($players);
        FamilyMembers::setupNewGame();
        Company::setupNewGame();
        Offices::setupNewGame();
        Orders::setupNewGame();
        LawCards::setupNewGame();
        PrimeMinister::setupNewGame();
        Regions::setupNewGame();
        SetupCards::setupNewGame();
        Ships::setupNewGame();
        if (Globals::getCrownInGame()) {
            AICards::setupNewGame();
        }

        // Init global values with their initial values.

        // Dummy content.
        // $this->setGameStateInitialValue("my_first_global_variable", 0);

        // Init game statistics.
        //
        // NOTE: statistics used in this file must be defined in your `stats.inc.php` file.

        // Dummy content.
        // $this->initStat("table", "table_teststat1", 0);
        // $this->initStat("player", "player_teststat1", 0);

        // TODO: Setup the initial game situation here.

        // Activate first player once everything has been initialized and ready.
        $this->activeNextPlayer();
    }

    /**
     * This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
     * You can do whatever you want in order to make sure the turn of this player ends appropriately
     * (ex: pass).
     *
     * Important: your zombie code will be called when the player leaves the game. This action is triggered
     * from the main site and propagated to the gameserver from a server, not from a browser.
     * As a consequence, there is no current player associated to this action. In your zombieTurn function,
     * you must _never_ use `getCurrentPlayerId()` or `getCurrentPlayerName()`, otherwise it will fail with a
     * "Not logged" error message.
     *
     * @param array{ type: string, name: string } $state
     * @param int $active_player
     * @return void
     * @throws feException if the zombie mode is not supported at this game state.
     */
    protected function zombieTurn(array $state, int $active_player): void
    {
        $state_name = $state["name"];

        if ($state["type"] === "activeplayer") {
            switch ($state_name) {
                default: {
                        $this->gamestate->nextState("zombiePass");
                        break;
                    }
            }

            return;
        }

        // Make sure player is in a non-blocking status for role turn.
        if ($state["type"] === "multipleactiveplayer") {
            $this->gamestate->setPlayerNonMultiactive($active_player, '');
            return;
        }

        throw new \feException("Zombie mode not supported at this game state: \"{$state_name}\".");
    }
}
