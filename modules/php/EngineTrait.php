<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Log;
use \Bga\GameFramework\Actions\Types\JsonParam;
use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;

trait EngineTrait
{
  function addCommonArgs(&$args)
  {
    $args['previousEngineChoices'] = Globals::getEngineChoices();
    $args['previousSteps'] = Log::getUndoableSteps();
  }

  /**
   * Trying to get the atomic action corresponding to the state where the game is
   */
  function getCurrentAtomicAction()
  {
    $stateId = $this->gamestate->state_id();
    return AtomicActions::getActionOfState($stateId);
  }

  /**
   * Ask the corresponding atomic action for its args
   */
  function argsAtomicAction()
  {
    $player = Players::getActive();
    $action = $this->getCurrentAtomicAction();
    $node = Engine::getNextUnresolved();
    $args = AtomicActions::getArgs($action, $node);
    $this->addCommonArgs($args);

    return $args;
  }

  /**
   * Pass the argument of the action to the atomic action
   */
  function actTakeAtomicAction(string $actionName, #[JsonParam(associative: null)] mixed $args)
  {
    $action = $this->getCurrentAtomicAction();
    AtomicActions::takeAction($action, $actionName, $args, Engine::getNextUnresolved());
  }


  /**
   * To pass if the action is an optional one
   */
  function actPassOptionalAction($auto = false)
  {
    if ($auto) {
      $this->gamestate->checkPossibleAction('actPassOptionalAction');
    } else {
      self::checkAction('actPassOptionalAction');
    }

    $action = $this->getCurrentAtomicAction();
    AtomicActions::pass($action, Engine::getNextUnresolved());
  }


  /**
   * Execute the state action of atomic action
   */
  function stAtomicAction()
  {
    $action = $this->getCurrentAtomicAction();
    AtomicActions::stAction($action, Engine::getNextUnresolved());
  }


  public function stResolveStack()
  {
  }


  /*******************************
   ******* CONFIRM / RESTART ******
   ********************************/
  public function argsConfirmTurn()
  {
    $data = [
      'previousEngineChoices' => Globals::getEngineChoices(),
      'previousSteps' => Log::getUndoableSteps(),
      'automaticAction' => false,
    ];
    $this->addCommonArgs($data);
    return $data;
  }

  /**
   * State function that can be used to auto confirm turn if disabled in the 
   * settings
   */
  public function stConfirmTurn()
  {
    // Check user preference to bypass if DISABLED is picked
    // $pref = Players::getActive()->getPref(OPTION_CONFIRM);
    // if ($pref == OPTION_CONFIRM_DISABLED && !Players::getActive()->canUseMap(4)) {
    //   $this->actConfirmTurn(true);
    // }
  }

  public function actConfirmTurn($auto = false)
  {
    if (!$auto) {
      self::checkAction('actConfirmTurn');
    }
    Engine::confirm();
  }

  public function actConfirmPartialTurn($auto = false)
  {
    if (!$auto) {
      self::checkAction('actConfirmPartialTurn');
    }
    Engine::confirmPartialTurn();
  }

  public function actRestart()
  {
    self::checkAction('actRestart');
    if (Globals::getEngineChoices() < 1) {
      throw new \BgaVisibleSystemException('No choice to undo');
    }
    Engine::restart();
  }

  public function actUndoToStep($stepId)
  {
    self::checkAction('actRestart');
    Engine::undoToStep($stepId);
  }
}
