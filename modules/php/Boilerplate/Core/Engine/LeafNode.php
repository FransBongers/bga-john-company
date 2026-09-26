<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core\Engine;

use  Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use  Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Models\Player;

/*
 * Leaf: a class that represent a Leaf
 */
class LeafNode extends AbstractNode
{
  public function __construct($info = [])
  {
    parent::__construct($info, []);
    $this->info['type'] = NODE_LEAF;
  }

  /**
   * An action leaf is resolved as soon as the action is resolved
   */
  public function isResolved()
  {
    return parent::isResolved() || ($this->getAction() != null && $this->isActionResolved());
  }

  public function getArgs()
  {
    return $this->info['args'] ?? null;
  }

  /**
   * A Leaf is doable if the corresponding action is doable by the player
   */
  public function isDoable(Player $player)
  {
    if (isset($this->info['action'])) {
      return $player->canTakeAction($this->info['action'], $this);
    }
    return false;
  }

  /**
   * The state is either hardcoded into the leaf, or correspond to the attached action
   */
  public function getState()
  {
    if (isset($this->info['state'])) {
      return $this->info['state'];
    }

    if (isset($this->info['action'])) {
      return AtomicActions::getState($this->info['action'], $this);
    }

    var_dump(\Bga\Games\Hegemony\Boilerplate\Core\Engine::$tree->toArray());
    throw new \Bga\GameFramework\VisibleSystemException('Trying to get state on a leaf without state nor action');
  }

  /**
   * The description is given by the corresponding action
   */
  public function getDescription(): string|array
  {
    if (isset($this->info['action'])) {
      return AtomicActions::get($this->info['action'], $this)->getDescription();
    }
    return parent::getDescription();
  }
}
