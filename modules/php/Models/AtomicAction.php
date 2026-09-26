<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Log;

/*
 * Action: base class to handle atomic action
 */

class AtomicAction
{
  protected $ctx = null; // Contain ctx information : current node of flow tree
  protected $description = '';
  public function __construct($ctx)
  {
    $this->ctx = $ctx;
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isOptional()
  {
    return false;
  }

  public function getDescription(): string|array
  {
    return $this->description ?? "";
  }

  public function getPlayer()
  {
    $playerId = $this->ctx->getPlayerId() ?? Players::getActiveId();
    return Players::get($playerId);
  }

  public function getState()
  {
    return null;
  }

  public function resolveAction($args = [], $checkpoint = false)
  {
    // $checkpoint = $checkpoint || Globals::getCheckpoint(); // Note: custom right now
    // Globals::setCheckpoint(false);
    Engine::resolveAction($args, $checkpoint, $this->ctx);
    Engine::proceed();
  }

  /**
   * Insert flow as child of current node
   */
  public function insertAsChild($flow)
  {
    Engine::insertAsChild($flow, $this->ctx);
  }

  /**
   * Adds new step to logs, so it can be undone per step
   * TODO: check byPassActiveCheck
   */
  public static function checkAction($action, $byPassActiveCheck = false)
  {
    // Notifications::log('checkAction',[
    //   'action' => $action,
    //   'byPassActiveCheck' => $byPassActiveCheck
    // ]);
    // Game::get()->debug( 'action: '. $action . ' - byPassActiveCheck: ' . ($byPassActiveCheck ? 'true' : 'false') );
    if ($byPassActiveCheck) {
      Game::get()->gamestate->checkPossibleAction($action);
    } else {
      Game::get()->checkAction($action);
      $stepId = Log::step();
      Notifications::newUndoableStep(Players::getCurrent(), $stepId);
    }
  }

  public function checkPlayer()
  {
    $currentPlayerId = Players::getCurrentId();

    $activePlayerIds = $this->ctx->getInfo()['activePlayerIds'];
    if (!in_array($currentPlayerId, $activePlayerIds)) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_999");
    }
    return $currentPlayerId;
  }

  public function getClassName()
  {
    $classname = get_class($this);
    if ($pos = strrpos($classname, '\\')) {
      return substr($classname, $pos + 1);
    }
    return $classname;
  }

  public function zombie($playerId)
  {
    Notifications::message("Zombie Turn not implemented for: " . $this->ctx->getAction() . ". Please create a bug report! ", []);

    $this->resolveAction(['automatic' => true], true);
  }
}
