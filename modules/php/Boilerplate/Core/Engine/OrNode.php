<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core\Engine;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Models\Player;

/*
 * OrNode: a class that represent an Node with a choice (parallel)
 */

class OrNode extends AbstractNode
{
  public function __construct($infos = [], $childs = [])
  {
    parent::__construct($infos, $childs);
    $this->info['type'] = NODE_OR;
  }

  /**
   * The description of the node is the sequence of description of its children
   */
  public function getDescriptionSeparator()
  {
    return ' + ';
  }

  /**
   * An OR node is doable if at least one of its child is doable (or if the OR node itself is optional)
   */
  public function isDoable(Player $player): bool
  {
    return $this->isOptional() ||
      $this->childrenReduceOr(function ($child) use ($player) {
        return $child->isDoable($player);
      });
  }

  /**
   * An OR node become optional as soon as one child is resolved
   */
  public function isOptional(): bool
  {
    $currentChoiceCount = $this->info['choiceCount'] ?? 0;
    $requiredChoiceCount = $this->info['requiredChoiceCount'] ?? null;

    if ($requiredChoiceCount !== null && $currentChoiceCount < $requiredChoiceCount) {
      return false;
    }

    return parent::isOptional() ||
      $this->childrenReduceOr(function ($child) {
        return $child->isResolved() && $child->getResolutionArgs() != PASS;
      });
  }

  /**
   * If at least one child was resolved already, other become optional
   */
  public function areChildrenOptional()
  {
    return $this->childrenReduceOr(function ($child) {
      return $child->isResolved() && $child->getResolutionArgs() != PASS;
    });
  }

  /**
   * An OR node is resolved either when marked as resolved, either when all children are resolved already
   */
  public function isResolved()
  {
    $currentChoiceCount = $this->info['choiceCount'] ?? 0;
    $requiredChoiceCount = $this->info['requiredChoiceCount'] ?? null;
    $maxChoiceCount = $this->info['maxChoiceCount'] ?? null;

    if ($requiredChoiceCount !== null && $currentChoiceCount >= $requiredChoiceCount) {
      return true;
    }

    if ($maxChoiceCount !== null && $currentChoiceCount >= $maxChoiceCount) {
      return true;
    }

    return parent::isResolved() || $this->isActionResolved() ||
      $this->childrenReduceAnd(function ($child) {
        return $child->isResolved();
      });
  }
}
