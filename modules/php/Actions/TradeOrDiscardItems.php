<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class TradeOrDiscardItems extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return \ST_TRADE_OR_DISCARD_ITEMS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTradeOrDiscardItems()
  {
    $args = $this->ctx->getArgs();
    $source = $args[SOURCE];
    $type = $args['type'];
    $playerId = $this->getActivePlayerIds()[0];

    $data = [
      '_private' => [
        $playerId => $this->getItems($playerId, $type),
      ],
      'type' => $type,
      'source' => LondonSeasonCards::get($source)->getTitle(),
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

  public function actPassTradeOrDiscardItems()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actTradeOrDiscardItems($args)
  {
    self::checkAction('actTradeOrDiscardItems');
    $playerId = $this->checkPlayer();

    $nodeArgs = $this->ctx->getArgs();
    $source = $nodeArgs[SOURCE];
    $type = $nodeArgs['type'];

    $player = Players::get($playerId);

    foreach ($this->getItems($playerId, $type) as $type => $items) {
      foreach ($items as $item) {
        switch ($type) {
          case SHARE:
            $item->returnToSupply();
            break;
          case BLACKMAIL:
            $item->discard($player, true);
            break;
          case WORKSHOP:
          case SHIPYARD:
            $item->returnToSupply($player);
            break;
        }
      }
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

  private function getItems(int $playerId, string $type): array
  {
    $items = [];

    switch ($type) {
      case SHARE:
        $items[SHARE] = Utils::filter(FamilyMembers::getCourtOfDirectors(), fn($familyMember) => $familyMember->getPlayerId() === $playerId);
        break;
      case BLACKMAIL:
        $items[BLACKMAIL] = Utils::filter(Players::get($playerId)->getLondonSeasonCards(), fn($card) => $card->getType() === BLACKMAIL);
        break;
      case SHIPYARD:
      case WORKSHOP:
        $items[$type] = Players::get($playerId)->getFamily()->getEnterprises($type);
        break;
    }

    return $items;
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
    return clienttranslate('TradeOrDiscardItems');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
