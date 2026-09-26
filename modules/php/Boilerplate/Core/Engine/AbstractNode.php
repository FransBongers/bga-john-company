<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core\Engine;

use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

/*
 * AbstractNode: a class that represent an abstract Node
 */

class AbstractNode
{
  protected $children = [];
  protected $parent = null;
  protected $info = [];

  /**
   * Info is all data provided when creating the Node. Can consist of:
   * -
   * children contains all child nodes.
   */
  public function __construct($info = [], $children = [])
  {
    $this->info = $info;
    $this->children = $children;

    foreach ($this->children as $child) {
      $child->attach($this);
    }
  }

  /**********************
   *** Tree utilities ***
   **********************/
  public function attach($parent)
  {
    $this->parent = $parent;
  }

  public function replaceAtPos($node, $index)
  {
    $this->children[$index] = $node;
    $node->attach($this);
    return $node;
  }

  /**
   * Returns index of this node in children list of parent
   */
  public function getIndex()
  {
    if ($this->parent == null) {
      return null;
    }

    foreach ($this->parent->getChildren() as $i => $child) {
      if ($child === $this) {
        return $i;
      }
    }
    throw new \Bga\GameFramework\VisibleSystemException("Can't find index of a child");
  }

  /**
   * Replace the current node with a different node. For example when changing a 
   * Leaf node to SEQ node.
   */
  public function replace($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \Bga\GameFramework\VisibleSystemException('Trying to replace the root');
    }
    return $this->parent->replaceAtPos($newNode, $index);
  }

  // Push node to children
  public function pushChild($child)
  {
    array_push($this->children, $child);
    $child->attach($this);
  }

  /**
   * Insert node right after current node in children list
   */
  public function insertAsBrother($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \Bga\GameFramework\VisibleSystemException('Trying to insert a brother of the root');
    }
    // Ensure parent is a seq node
    if (!$this->parent instanceof \Bga\Games\JohnCompany\Boilerplate\Core\Engine\SeqNode) {
      $newParent = new \Bga\Games\JohnCompany\Boilerplate\Core\Engine\SeqNode([], []);
      $newParent = $this->parent->replaceAtPos($newParent, $index);
      $newParent->pushChild($this);
    }

    return $this->parent->insertChildAtPos($newNode, $index);
  }

  /**
   * Insert node right before current node in children list
   */
  public function insertBefore($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \Bga\GameFramework\VisibleSystemException('Trying to insert a brother of the root');
    }
    // Ensure parent is a seq node
    if (!$this->parent instanceof \Bga\Games\JohnCompany\Boilerplate\Core\Engine\SeqNode) {
      $newParent = new \Bga\Games\JohnCompany\Boilerplate\Core\Engine\SeqNode([], []);
      $newParent = $this->parent->replaceAtPos($newParent, $index);
      $newParent->pushChild($this);
    }

    return $this->parent->insertChildAtPos($newNode, $index - 1);
  }

  public function insertChildAtPos($node, $index)
  {
    array_splice($this->children, $index + 1, 0, [$node]);
    $node->attach($this);
    return $node;
  }

  // Put child at front of children list
  public function unshiftChild($child)
  {
    array_unshift($this->children, $child);
    $child->attach($this);
  }

  public function getParent()
  {
    return $this->parent;
  }

  public function getChildren()
  {
    return $this->children;
  }

  public function countChildren()
  {
    return count($this->children);
  }

  public function toArray()
  {
    return array_merge($this->info, [
      'children' => \array_map(function ($child) {
        return $child->toArray();
      }, $this->children),
    ]);
  }


  protected function childrenReduceAnd($callable)
  {
    return \array_reduce(
      $this->children,
      function ($acc, $child) use ($callable) {
        return $acc && $callable($child);
      },
      true
    );
  }

  protected function childrenReduceOr($callable)
  {
    return \array_reduce(
      $this->children,
      function ($acc, $child) use ($callable) {
        return $acc || $callable($child);
      },
      false
    );
  }

  /**
   * The description of the node is the sequence of description of its children, separated by a separator
   */
  public function getDescription(): string|array
  {
    $i = 0;
    $desc = [];
    $args = [];

    if (isset($this->info['customDescription'])) {
      return $this->info['customDescription'];
    }

    foreach ($this->children as $child) {
      $name = 'action' . $i++;
      $tmp = $child->getDescription();
      if ($tmp != '') {
        $args[$name] = $tmp;
        $args['i18n'][] = $name;

        if ($child->forceConfirmation()) {
          $tmp = [
            'log' => clienttranslate('Allow ${player_name} to take a triggered action'),
            'args' => [
              'player_name' => Players::get($child->getPlayerId())->getName(),
            ],
          ];
        }
        $args[$name] = $tmp;
        $args['i18n'][] = $name;
        $desc[] = '${' . $name . '}';
      }
    }

    return [
      'log' => \implode($this->getDescriptionSeparator(), $desc),
      'args' => $args,
    ];
  }

  public function getDescriptionSeparator()
  {
    return '';
  }

  public function getStateDescription(): string|array
  {
    return $this->info['stateDescription'] ?? "";
  }

  /***********************
   *** Getters (sugar) ***
   ***********************/
  public function getState()
  {
    return $this->info['state'] ?? null;
  }

  public function getPlayerId()
  {
    return $this->info['playerId'] ?? null;
  }

  public function getType()
  {
    return $this->info['type'] ?? NODE_LEAF;
  }

  public function getArgs()
  {
    return $this->info['args'] ?? null;
  }

  public function getCardId()
  {
    return $this->info['cardId'] ?? null;
  }

  public function getSource()
  {
    return $this->infos['source'] ?? null;
  }

  public function getSourceId()
  {
    return $this->infos['sourceId'] ?? null;
  }

  public function getInfo()
  {
    return $this->info;
  }

  public function updateInfo($key, $value)
  {
    $this->info[$key] = $value;
  }

  public function doNotDisplayIfNotDoable(): bool
  {
    return false;
  }

  public function isDoable(Player $player)
  {
    return true;
  }

  public function isReUsable()
  {
    return $this->info['reusable'] ?? false;
  }

  public function isResolvingParent()
  {
    return $this->info['resolveParent'] ?? false;
  }

  /***********************
   *** Node resolution ***
   ***********************/
  public function isResolved()
  {
    return isset($this->info['resolved']) && $this->info['resolved'];
  }


  public function getResolutionArgs()
  {
    return $this->info['resolutionArgs'] ?? null;
  }

  public function getNextUnresolved()
  {
    if ($this->isResolved()) {
      return null;
    }

    if (!isset($this->info['choice']) || $this->children[$this->info['choice']]->isResolved()) {
      return $this;
    } else {
      return $this->children[$this->info['choice']]->getNextUnresolved();
    }
  }

  public function resolve($args)
  {
    $this->info['resolved'] = true;
    $this->info['resolutionArgs'] = $args;
  }

  // Useful for zombie players
  public function clearZombieNodes($playerId)
  {
    foreach ($this->children as $child) {
      $child->clearZombieNodes($playerId);
    }

    if ($this->getPlayerId() == $playerId) {
      $this->resolve(ZOMBIE);
    }
  }

  /********************
   *** Node choices ***
   ********************/
  public function areChildrenOptional()
  {
    return false;
  }

  public function isOptional()
  {
    return $this->info['optional'] ?? $this->parent != null && $this->parent->areChildrenOptional();
  }

  public function isAutomatic(?Player $player = null): bool
  {
    $choices = $this->getChoices($player);
    return count($choices) < 2;
  }


  public function getChoices($player = null, $displayAllChoices = false)
  {
    $choice = null;
    $choices = [];
    $children = $this->getType() == NODE_SEQ && !empty($this->children) ? [0 => $this->children[0]] : $this->children;

    foreach ($children as $id => $child) {
      $isDisplayed = true;
      $isDoable = $child->isDoable($player);
      if (!$isDoable) {
        $isDisplayed = $displayAllChoices && !$child->doNotDisplayIfNotDoable();
      }

      if (!$child->isResolved() && $isDisplayed) {
        $choice = [
          'id' => $id,
          'description' => $this->getType() == NODE_SEQ ? $this->getDescription() : $child->getDescription(),
          'args' => $child->getArgs(),
          'optionalAction' => $child->isOptional(),
          'automaticAction' => $child->isAutomatic($player),
          // 'independentAction' => $child->isIndependent($player),
          // 'irreversibleAction' => $child->isIrreversible($player),
          'source' => $child->getSource(),
          'sourceId' => $child->getSourceId(),
        ];
        $choices[$id] = $choice;
      }
    }

    if ($this->isOptional()) {
      if (count($choices) != 1 || !$choice['optionalAction'] || $choice['automaticAction']) {
        $choices[PASS] = [
          'id' => PASS,
          'description' => clienttranslate('Pass'),
          'irreversibleAction' => false,
          'args' => [],
        ];
      }
    }

    return $choices;
  }

  public function choose($childIndex, $auto = false)
  {
    $this->info['choice'] = $childIndex;
    $child = $this->children[$this->info['choice']];
    if (!$auto && !($child instanceof LeafNode)) {
      $child->enforceMandatory();
    }
  }

  public function unchoose()
  {
    unset($this->info['choice']);
  }


  /************************
   *** Action resolution ***
   ************************/
  // Declared here because some action leafs can become SEQ nodes once triggered
  // -> we need to distinguish the action resolution from the node resolution
  public function getAction()
  {
    return $this->info['action'] ?? null;
  }

  public function isActionResolved()
  {
    return $this->info['actionResolved'] ?? false;
  }

  public function incChoiceCount($change = 1)
  {
    if (!isset($this->info['choiceCount'])) {
      $this->info['choiceCount'] = 0;
    }
    $this->info['choiceCount'] += $change;
  }

  public function getActionResolutionArgs()
  {
    return $this->info['actionResolutionArgs'] ?? null;
  }

  public function resolveAction($args)
  {
    $this->info['actionResolved'] = true;
    $this->info['actionResolutionArgs'] = $args;
    $this->info['optional'] = false;
  }

  public function getResolvedActions($types)
  {
    $actions = [];
    if (in_array($this->getAction(), $types) && $this->isActionResolved()) {
      $actions[] = $this;
    }
    foreach ($this->children as $child) {
      $actions = array_merge($actions, $child->getResolvedActions($types));
    }
    return $actions;
  }

  public function getUnresolvedActions($types)
  {
    $actions = [];
    if (in_array($this->getAction(), $types) && !$this->isActionResolved()) {
      $actions[] = $this;
    }
    foreach ($this->children as $child) {
      $actions = array_merge($actions, $child->getUnresolvedActions($types));
    }
    return $actions;
  }
}
