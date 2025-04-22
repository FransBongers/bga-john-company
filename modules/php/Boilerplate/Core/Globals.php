<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core;

use Bga\Games\JohnCompany;
use Bga\Games\JohnCompany\Managers\Players;


/*
 * Globals
 */

class Globals extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Manager
{
  protected static $initialized = false;
  protected static $variables = [
    'engine' => 'obj', // DO NOT MODIFY, USED IN ENGINE MODULE
    'engineChoices' => 'int', // DO NOT MODIFY, USED IN ENGINE MODULE => number of choices a player has made?
    'callbackEngineResolved' => 'obj', // DO NOT MODIFY, USED IN ENGINE MODULE => function called when engine is resolved?
    'anytimeRecursion' => 'int', // DO NOT MODIFY, USED IN ENGINE MODULE
    'customTurnOrders' => 'obj', // DO NOT MODIFY, USED FOR CUSTOM TURN ORDER FEATURE
    'logState' => 'int', // Used to store state id when enabling the log
    'firstPlayer' => 'int',
    // Game options
    'scenarioId' => 'str',
    'crownInGame' => 'bool', // based on number of players
    'draftSetup' => 'bool',
    // Other
    // 'activePlayerId' => 'int',
    'cascadedRegions' => 'obj',
    'company' => 'obj',
    'crown' => 'obj',
    'deregulation' => 'bool',
    'elephant' => 'obj',
    'phase' => 'str',
    'turn' => 'int',
    'options' => 'obj',
    'powerTokens' => 'obj',
    'eventsToResolve' => 'int',
  ];

  protected static $table = 'global_variables';
  protected static $primary = 'name';
  protected static function cast($row)
  {
    $val = json_decode(\stripslashes($row['value']), true);
    return (self::$variables[$row['name']] ?? null) == 'int' ? ((int) $val) : $val;
  }

  /*
   * Fetch all existings variables from DB
   */
  protected static $data = [];
  public static function fetch()
  {
    // Turn of LOG to avoid infinite loop (Globals::isLogging() calling itself for fetching)
    $tmp = self::$log;
    self::$log = false;

    foreach (
      self::DB()
        ->select(['value', 'name'])
        ->get()
      as $name => $variable
    ) {
      if (\array_key_exists($name, self::$variables)) {
        self::$data[$name] = $variable;
      }
    }
    self::$initialized = true;
    self::$log = $tmp;
  }

  /*
   * Create and store a global variable declared in this file but not present in DB yet
   *  (only happens when adding globals while a game is running)
   */
  public static function create($name)
  {
    if (!\array_key_exists($name, self::$variables)) {
      return;
    }

    $default = [
      'int' => 0,
      'obj' => [],
      'bool' => false,
      'str' => '',
    ];
    $val = $default[self::$variables[$name]];
    self::DB()->insert(
      [
        'name' => $name,
        'value' => \json_encode($val),
      ],
      true
    );
    self::$data[$name] = $val;
  }

  /*
   * Magic method that intercept not defined static method and do the appropriate stuff
   */
  public static function __callStatic($method, $args)
  {
    if (!self::$initialized) {
      self::fetch();
    }

    if (preg_match('/^([gs]et|inc|is)([A-Z])(.*)$/', $method, $match)) {
      // Sanity check : does the name correspond to a declared variable ?
      $name = mb_strtolower($match[2]) . $match[3];
      if (!\array_key_exists($name, self::$variables)) {
        throw new \InvalidArgumentException("Property {$name} doesn't exist");
      }

      // Create in DB if don't exist yet
      if (!\array_key_exists($name, self::$data)) {
        self::create($name);
      }

      if ($match[1] == 'get') {
        // Basic getters
        return self::$data[$name];
      } elseif ($match[1] == 'is') {
        // Boolean getter
        if (self::$variables[$name] != 'bool') {
          throw new \InvalidArgumentException("Property {$name} is not of type bool");
        }
        return (bool) self::$data[$name];
      } elseif ($match[1] == 'set') {
        // Setters in DB and update cache
        if (!isset($args[0])) {
          throw new \InvalidArgumentException("Setting {$name} require a value");
        }
        $value = $args[0];
        if (self::$variables[$name] == 'int') {
          $value = (int) $value;
        }
        if (self::$variables[$name] == 'bool') {
          $value = (bool) $value;
        }

        self::$data[$name] = $value;
        self::DB()->update(['value' => \addslashes(\json_encode($value))], $name);
        return $value;
      } elseif ($match[1] == 'inc') {
        if (self::$variables[$name] != 'int') {
          throw new \InvalidArgumentException("Trying to increase {$name} which is not an int");
        }

        $getter = 'get' . $match[2] . $match[3];
        $setter = 'set' . $match[2] . $match[3];
        return self::$setter(self::$getter() + (empty($args) ? 1 : $args[0]));
      }
    }
    // return undefined;
  }

  /*
   * Setup new game
   */
  public static function setupNewGame($players, $options)
  {
    self::setCascadedRegions([]);
    self::setPhase(SETUP);
    self::setCrownInGame(count($players) <= 2);
    self::setCrown([]);
    self::setDeregulation(false);
    self::setEventsToResolve(0);
    self::setPowerTokens([
      POWER_TOKEN_SOCIAL,
      POWER_TOKEN_COMPANY_SHARE,
      POWER_TOKEN_SHIPPING,
      POWER_TOKEN_MANUFACTURING,
    ]);
    // 
    // Game options - Note game option values are always a string
    self::setScenarioId(SCENARIO_OPTION_SCENARIO_ID_MAP[intval($options[OPTION_SCENARIO])]);
    self::setDraftSetup(intval($options[OPTION_DRAFT_SETUP_CARDS]) === OPTION_DRAFT_SETUP_CARDS_ENABLED);
    self::setOptions($options);
    // self::setScenarioId(THE_1710_SCENARIO);
    
  }


}
