<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class DirectorOfTradeSpecialEnvoy extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY;
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

  public function stDirectorOfTradeSpecialEnvoy()
  {
    // Get data
    $args = $this->argsDirectorOfTradeSpecialEnvoy();

    if ($args['treasury'] === 0) {
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

  public function argsDirectorOfTradeSpecialEnvoy()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $playerId = $info['activePlayerIds'][0];
    $proposal = isset($info['proposal']) ? $info['proposal'] : null;

    $data = [
      'activePlayerIds' => [$playerId],
      'treasury' => Offices::get(DIRECTOR_OF_TRADE)->getTreasury(),
      'proposal' => $proposal,
    ];

    return $data;
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

  public function actPassDirectorOfTradeSpecialEnvoy()
  {
    $playerId = $this->checkPlayer();
    // $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actDirectorOfTradeSpecialEnvoy($args)
  {
    self::checkAction('actDirectorOfTradeSpecialEnvoy');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsDirectorOfTradeSpecialEnvoy();

    $player = Players::get($playerId);

    $spend = $args->spend;
    $makeCheck = $args->makeCheck;
    if (!$makeCheck && $stateArgs['proposal'] !== $spend) {
      $this->ctx->updateInfo('proposal', $spend);

      $text = $spend === 0 ? clienttranslate('${player_name} proposes ${tkn_boldText_not} to make a check') : clienttranslate('${player_name} proposes to make a check with ${tkn_boldText_number} dice');

      Notifications::message($text, [
        'player' => $player,
        'tkn_boldText_not' => clienttranslate('not'),
        'tkn_boldText_number' => $spend,
        'i18n' => ['tkn_boldText_not']
      ]);

      Engine::save();
    }
    if (!$makeCheck) {
      Engine::proceed();
      return;
    }

    $office = Offices::get(DIRECTOR_OF_TRADE);
    $office->incTreasury(-$spend);

    Notifications::payFromTreasury($player, $office, $spend);
    $checkResult = JoCoUtils::makeCheck($player, $office, $spend);
    if ($checkResult !== CATASTROPHIC_FAILURE && $office->getTreasury() > 0) {
      $action = [
        'action' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId],
        'optional' => true,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    }
    if ($checkResult === SUCCESS) {
      $action = [
        'action' => DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS,
        'playerId' => 'some',
        'activePlayerIds' => [$playerId]
      ];
      $this->ctx->insertAsBrother(Engine::buildTree($action));
    } else {
      Notifications::failCheck($player);
    }
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');

    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
