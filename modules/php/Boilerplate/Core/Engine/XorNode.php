<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core\Engine;

use Bga\Games\JohnCompany\Models\Player;

/*
 * XorNode: a class that represent an Node with a choice (parallel) with a unique possibility
 */

class XorNode extends AbstractNode
{
  public function __construct($infos = [], $childs = [])
  {
    parent::__construct($infos, $childs);
    $this->info['type'] = NODE_XOR;
  }

  /**
   * The description of the node is the sequence of description of its children
   */
  public function getDescriptionSeparator()
  {
    return ' / ';
  }

  /**
   * An XOR node is doable if at least one of its child is doable (or if the XOR node itself is optional)
   */
  public function isDoable(Player $player): bool
  {
    return $this->isOptional() ||
      $this->childrenReduceOr(function ($child) use ($player) {
        return $child->isDoable($player);
      });
  }

  /**
   * A XOR node is resolved as soon as one child is resolved
   */
  public function isResolved()
  {
    // If we passed the node (which might be optional)
    if (parent::isResolved()) {
      return true;
    }

    if($this->isActionResolved()) {
      return true;
    }

    return $this->childrenReduceOr(function ($child) {
      return $child->isResolved();
    });
  }
}
