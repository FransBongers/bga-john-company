<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class UseManOnTheInside extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_USE_MAN_ON_THE_INSIDE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsUseManOnTheInside()
  {
    $args = $this->ctx->getArgs();
    $effect = $args['effect'];

    $data = [
      'playedCardId' => $effect[CARD_ID]
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

  public function actPassUseManOnTheInside()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actUseManOnTheInside($args)
  {
    self::checkAction('actUseManOnTheInside');
    $playerId = $this->checkPlayer();
    $play = $args->play;

    $effect = $this->ctx->getArgs()['effect'];

    $playedCard = LondonSeasonCards::get($effect[CARD_ID]);
    if ($play) {
      $player = Players::get($playerId);
      $card = LondonSeasonCards::get(MAN_ON_THE_INSIDE_ID);
      $card->play($player);
      $playedCard->setLocation(Locations::playedBlackmailCards($player->getFamilyId()));
      Notifications::moveBlackmailCard($player, $playedCard, clienttranslate('${player_name} cancels the effect of ${tkn_blackmailCard}'), [
        'player' => $player,
        'tkn_blackmailCard' => $playedCard->getId(),
      ]);
    } else {
      $playedCardOwner = Players::get($effect[PLAYER_ID]);
      $timingData = $effect[TIMING_DATA] ?? [];
      $playedCard->applyEffect($this->ctx, $playedCardOwner, $timingData);
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

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('UseManOnTheInside');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
