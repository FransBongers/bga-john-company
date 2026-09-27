<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Models\Player;

class CommanderDeploy extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_COMMANDER_DEPLOY;
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


  public function stCommanderDeploy()
  {
    $stateArgs = $this->argsCommanderDeploy();
    if ($stateArgs['skipOnEnteringState']) {
      $args = $this->ctx->getArgs();
      if ($args['first']) {
        Notifications::message('${player_name} cannot perform a Deploy action', [
          'player' => Players::get($args['commanderPlayerId'])
        ]);
      }
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsCommanderDeploy()
  {
    $args = $this->ctx->getArgs();
    $info = $this->ctx->getInfo();

    $options = $this->getOptions();

    return [
      'activePlayerIds' => $info['activePlayerIds'],
      'options' => $options,
      'skipOnEnteringState' => count($options) === 0,
    ];
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

  public function actPassCommanderDeploy()
  {
    $playerId = $this->checkPlayer();
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS);
  }

  public function actCommanderDeploy($args)
  {
    self::checkAction('actCommanderDeploy');
    $playerId = $this->checkPlayer();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions()
  {
    // Implement the logic to get the available options for the commander deploy action
    return [];
  }

  private function insertState()
  {
    $args = $this->ctx->getArgs();
    $commanderPlayerId = $args['commanderPlayerId'];
    $presidentOfficeId = $args['presidentOfficeId'];


    $this->ctx->insertAsBrother(new LeafNode([
      'action' => COMMANDER_DEPLOY,
      'playerId' => 'some',
      'activePlayerIds' => [$commanderPlayerId],
      'optional' => true,
      'args' => [
        'presidentOfficeId' => $presidentOfficeId,
      ]
    ]));
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('Deploy');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
