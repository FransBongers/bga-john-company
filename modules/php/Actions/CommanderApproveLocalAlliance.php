<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;

use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\ArmyPiece;
use Bga\Games\JohnCompany\Models\Player;

class CommanderApproveLocalAlliance extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_COMMANDER_APPROVE_LOCAL_ALLIANCE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsCommanderApproveLocalAlliance()
  {
    $args = $this->ctx->getArgs();
    $info = $this->ctx->getInfo();

    $localAllianceId = $args['localAllianceId'];
    $data = [
      'commanderPlayerId' => $args['commanderPlayerId'],
      'localAlliance' => ArmyPieces::get($localAllianceId),
      'presidentOfficeId' => $args['presidentOfficeId'],
      'activePlayerIds' => $info['activePlayerIds'],
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

  public function actPassCommanderApproveLocalAlliance()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actCommanderApproveLocalAlliance($args)
  {
    self::checkAction('actCommanderApproveLocalAlliance');
    $playerId = $this->checkPlayer();
    $approved = $args->approve;

    if ($approved) {
      Notifications::message(clienttranslate('${player_name} approves the request for funds'), [
        'player' => Players::get($playerId),
      ]);
      $stateArgs = $this->argsCommanderApproveLocalAlliance();
      $this->purchaseAlliance($stateArgs['commanderPlayerId'], $stateArgs['localAlliance'], $stateArgs['presidentOfficeId']);
    } else {
      Notifications::message(clienttranslate('${player_name} rejects the request for funds'), [
        'player' => Players::get($playerId),
      ]);
    }

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

  private function purchaseAlliance(string $commanderPlayerId, ArmyPiece $localAlliance, string $presidentOfficeId)
  {
    $commanderPlayer = Players::get($commanderPlayerId);
    $localAlliance->purchaseAlliance($commanderPlayer, $presidentOfficeId);
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##... ...
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('Approve Local Alliance');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
