<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class ParliamentMeetsCommitToOpposition extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return \ST_PARLIAMENT_MEETS_COMMIT_TO_OPPOSITION;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsParliamentMeetsCommitToOpposition()
  {
    $args = $this->ctx->getArgs();

    $data = [];

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

  public function actPassParliamentMeetsCommitToOpposition()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actParliamentMeetsCommitToOpposition($args)
  {
    self::checkAction('actParliamentMeetsCommitToOpposition');
    $playerId = $this->checkPlayer();

    $commit = $args->commit;
    $nodeArgs = $this->ctx->getArgs();

    $targetPlayerId = $nodeArgs['targetPlayerId'];
    $votingPlayerId = $nodeArgs['votingPlayerId'];
    $numberOfVotes = $nodeArgs['numberOfVotes'];

    if ($commit) {
      Parliament::addPlayerThatVotedAgainst($targetPlayerId);
      Parliament::incOppositionVotes($targetPlayerId, $numberOfVotes);
    } else {
      Parliament::incOppositionVotes($votingPlayerId, $numberOfVotes);
    }

    Notifications::commitToOpposition(
      Players::get($playerId),
      (bool) $commit,
      Players::get($votingPlayerId),
      $numberOfVotes,
      Parliament::getOpposition()
    );

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

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('ParliamentMeetsCommitToOpposition');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
