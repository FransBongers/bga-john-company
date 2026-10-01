<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class LondonSeasonChooseCard extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_LONDON_SEASON_CHOOSE_CARD;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsLondonSeasonChooseCard()
  {
    $args = $this->ctx->getArgs();
    $info = $this->ctx->getInfo();
    $activePlayerIds = $info['activePlayerIds'];
    $playerId = $activePlayerIds[0];

    $cards = LondonSeasonCards::getInLocation(Locations::londonSeasonDisplay())->toArray();

    $data = [
      'prestigeCards' => Utils::filter($cards, fn($card) => $card->getType() === PRESTIGE),
      '_private' => [
        $playerId => array_map(fn($card) => $card->jsonSerializePrivate(), Utils::filter($cards, fn($card) => $card->getType() === BLACKMAIL)),
      ]
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

  public function actPassLondonSeasonChooseCard()
  {
    $this->resolveAction(PASS);
  }

  public function actLondonSeasonChooseCard($args)
  {
    self::checkAction('actLondonSeasonChooseCard');
    $playerId = $this->checkPlayer();

    $cardId = $args->cardId;
    $take = $args->take;

    $availableCards = LondonSeasonCards::getInLocation(Locations::londonSeasonDisplay())->toArray();

    $card = Utils::array_find($availableCards, fn($c) => $c->getId() === $cardId);

    if ($card === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_056");
    }

    $player = Players::get($playerId);
    if ($take) {
      $card->take($player);
    } else {
      $card->discard($player);
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

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('LondonSeasonChooseCard');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
