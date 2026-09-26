<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\XorNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;

class ResolveChoice extends \Bga\Games\JohnCompany\Models\AtomicAction
{

  public function getState()
  {
    return ST_RESOLVE_CHOICE;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##


  public function stResolveChoice()
  {
    if ($this->ctx->getType() === NODE_XOR) {
      return;
    }

    $choices = $this->ctx->getChoices(self::getPlayer());

    $numberOfChoices = count($choices);

    if ($numberOfChoices === 0 || ($numberOfChoices === 1 && isset($choices[PASS]))) {
      $this->resolveAction(['automatic' => true]);
      return;
    }
  }


  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsResolveChoice()
  {
    $player = Players::getActive();
    $node = Engine::getNextUnresolved();
    if (is_null($node)) {
      return [];
    }

    // $choices = $this->ctx->getChoices(self::getPlayer());
    // $numberOfChoices = count($choices);

    $info = $node->getInfo();
    $displayAllChoices = $info['displayAllChoices'] ?? true;

    $args = array_merge($node->getArgs() ?? [], [
      'choices' => Engine::getNextChoice($player),
      'allChoices' => Engine::getNextChoice($player, $displayAllChoices),
    ]);

    if ($node->getStateDescription() != "") {
      $desc = $node->getStateDescription();
      $args['description'] = $desc['description'];
      $args[' '] = $desc['descriptionmyturn'];
      $args = array_merge($args, $desc['args'] ?? []);
    } else if ($node instanceof XorNode) {
      $args['descSuffix'] = 'xor';
    }

    // $args['skipOnEnteringState'] = $numberOfChoices === 0 || ($numberOfChoices === 1 && isset($choices[PASS]));
    // $sourceId = $node->getSourceId() ?? null;
    // if (!isset($args['source']) && !is_null($sourceId)) {
    //   $args['sourceId'] = $sourceId;
    //   $args['source'] = ZooCards::get($sourceId)->getName();
    // }
    // $this->addArgsAnytimeAction($args, 'resolveChoice');
    return $args;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassResolveChoice($isZombie = false)
  {
    // $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actResolveChoice($args, $isZombie = false)
  {
    self::checkAction('actResolveChoice', $isZombie);
    $actionType = $args->actionType;


    $this->resolveAction(['args' => $args]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // .########..#######..##.....##.########..####.########
  // ......##..##.....##.###...###.##.....##..##..##......
  // .....##...##.....##.####.####.##.....##..##..##......
  // ....##....##.....##.##.###.##.########...##..######..
  // ...##.....##.....##.##.....##.##.....##..##..##......
  // ..##......##.....##.##.....##.##.....##..##..##......
  // .########..#######..##.....##.########..####.########

  public function zombie($playerId)
  {
    $stateArgs = $this->argsResolveChoice();

    if ($stateArgs['skipOnEnteringState'] ?? false) {
      return;
    }

    $choices = $stateArgs['choices'] ?? [];

    if (count($choices) === 1 && isset($choices[PASS])) {
      Game::get()->actChooseAction(PASS);
      return;
    }

    if (count($choices) === 0) {
      $this->resolveAction(['automatic' => true]);
      // Game::get()->actChooseAction(PASS);
      return;
    }

    $choice = Utils::randomItemFromArray(array_values($choices));

    Game::get()->actChooseAction($choice['id']);
  }
}
