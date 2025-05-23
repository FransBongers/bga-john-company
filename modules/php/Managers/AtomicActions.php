<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Managers\Players;

class AtomicActions
{
  // Mapping of actionId and corresponding class
  static $classes = [
    BONUSES => BONUSES,
    CHAIRMAN => CHAIRMAN,
    CHAIRMAN_DEBT_CONSENT => CHAIRMAN_DEBT_CONSENT,
    DIRECTOR_OF_TRADE_SPECIAL_ENVOY => DIRECTOR_OF_TRADE_SPECIAL_ENVOY,
    DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS => DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS,
    DIRECTOR_OF_TRADE_TRANSFERS => DIRECTOR_OF_TRADE_TRANSFERS,
    DRAFT_CARD => DRAFT_CARD,
    DRAFT_CARD_NEXT_STEP => DRAFT_CARD_NEXT_STEP,
    ENLIST_OFFICER => ENLIST_OFFICER,
    ENLIST_WRITER => ENLIST_WRITER,
    EVENTS_IN_INDIA_CRISIS_DEFENSE => EVENTS_IN_INDIA_CRISIS_DEFENSE,
    EVENTS_IN_INDIA_STORMS => EVENTS_IN_INDIA_STORMS,
    EVENTS_IN_INDIA_RESOLVE_EVENT => EVENTS_IN_INDIA_RESOLVE_EVENT,
    FAMILY_ACTION => FAMILY_ACTION,
    FOREIGN_INVASION => FOREIGN_INVASION,
    FOREIGN_INVASION_END => FOREIGN_INVASION_END,
    MANAGER_OF_SHIPPING => MANAGER_OF_SHIPPING,
    MILITARY_AFFAIRS_ASSIGN => MILITARY_AFFAIRS_ASSIGN,
    MILITARY_AFFAIRS_TRANSFERS => MILITARY_AFFAIRS_TRANSFERS,
    NEW_COMPANY_SHARES => NEW_COMPANY_SHARES,
    PARLIAMENT_MEETS => PARLIAMENT_MEETS,
    PERFORM_SETUP => PERFORM_SETUP,
    PRESIDENCY_DECIDE_ORDER => PRESIDENCY_DECIDE_ORDER,
    PRESIDENCY_TRADE => PRESIDENCY_TRADE,
    PRESIDENCY_TRADE_FILL_ORDERS => PRESIDENCY_TRADE_FILL_ORDERS,
    PURCHASE_LUXURY => PURCHASE_LUXURY,
    PURCHASE_SHIPYARD => PURCHASE_SHIPYARD,
    PURCHASE_WORKSHOP => PURCHASE_WORKSHOP,
    REVENUE_EMERGENCY_LOANS => REVENUE_EMERGENCY_LOANS,
    REVENUE_EXPENSES => REVENUE_EXPENSES,
    REVENUE_CHECK_EXPECTATIONS => REVENUE_CHECK_EXPECTATIONS,
    REVENUE_ROYAL_PARDON => REVENUE_ROYAL_PARDON,
    REVENUE_PAY_DIVIDENDS => REVENUE_PAY_DIVIDENDS,
    SEEK_SHARE => SEEK_SHARE,
  ];

  public static function get($actionId, $ctx = null)
  {
    if (!\array_key_exists($actionId, self::$classes)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get an atomic action not defined in Actions.php : ' . $actionId);
    }
    $name = '\Bga\Games\JohnCompany\Actions\\' . self::$classes[$actionId];
    // $name = '\Bga\Games\JohnCompany\Actions\\' . $actionId;
    return new $name($ctx);
  }

  public static function getActionOfState($stateId, $throwErrorIfNone = true)
  {
    foreach (array_keys(self::$classes) as $actionId) {
      if (self::getState($actionId, null) == $stateId) {
        return $actionId;
      }
    }

    if ($throwErrorIfNone) {
      throw new \BgaVisibleSystemException('Trying to fetch args of a non-declared atomic action in state ' . $stateId);
    } else {
      return null;
    }
  }

  public static function isDoable($actionId, $ctx, $player)
  {
    $res = self::get($actionId, $ctx)->isDoable($player);
    return $res;
  }

  public static function getErrorMessage($actionId)
  {
    $actionId = ucfirst(mb_strtolower($actionId));
    $msg = sprintf(
      Game::get()::translate(
        'Attempting to take an action (%s) that is not possible. Either another card erroneously flagged this action as possible, or this action was possible until another card interfered.'
      ),
      $actionId
    );
    return $msg;
  }

  public static function getState($actionId, $ctx)
  {
    return self::get($actionId, $ctx)->getState();
  }

  public static function getArgs($actionId, $ctx)
  {
    $action = self::get($actionId, $ctx);
    $methodName = 'args' . $action->getClassName();
    $args = \method_exists($action, $methodName) ? $action->$methodName() : [];
    return array_merge($args, ['optionalAction' => $ctx->isOptional()]);
  }

  public static function takeAction($actionId, $actionName, $args, $ctx)
  {
    $player = Players::getActive();
    if (!self::isDoable($actionId, $ctx, $player)) {
      throw new \BgaUserException(self::getErrorMessage($actionId));
    }

    $action = self::get($actionId, $ctx);
    $methodName = $actionName; //'act' . self::$classes[$actionId];
    $action->$methodName($args);
  }

  /**
   * Execute state action
   */
  public static function stAction($actionId, $ctx)
  {
    $action = self::get($actionId, $ctx);
    $methodName = 'st' . $action->getClassName();
    if (\method_exists($action, $methodName)) {
      $action->$methodName();
    }
  }

  /**
   * Action executed before activating the state
   */
  public static function stPreAction($actionId, $ctx)
  {
    $action = self::get($actionId, $ctx);
    $methodName = 'stPre' . $action->getClassName();
    if (\method_exists($action, $methodName)) {
      $action->$methodName();
      // TODO: check if we need irreversible check at some points
      // if ($ctx->isIrreversible(Players::get($ctx->getPId()))) {
      //   Engine::checkpoint();
      // }
    }
  }

  /**
   * Executes pass action as defined in atomic action
   */
  public static function pass($actionId, $ctx)
  {
    if (!$ctx->isOptional()) {
      self::error($ctx->toArray());
      throw new \BgaVisibleSystemException('This action is not optional');
    }

    $action = self::get($actionId, $ctx);
    $methodName = 'actPass' . $action->getClassName();
    if (\method_exists($action, $methodName)) {
      $action->$methodName();
    } else {
      Engine::resolve(PASS);
    }

    Engine::proceed();
  }
}
