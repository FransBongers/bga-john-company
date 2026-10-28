<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Players;

class UseRoyalProtection extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_USE_ROYAL_PROTECTION;
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

  public function stUseRoyalProtection()
  {
    $args = $this->ctx->getArgs();
    $playerId = Players::getChairmanPlayerId();
    $player = Players::get($playerId);

    $option = $args['option'];

    if ($option === YES) {
      $card = LawCards::get(ROYAL_PROTECTION_ID);
      $text = clienttranslate('${player_name} discards ${tkn_lawCard} to avoid emergency loans and cancel remaining expenses');
      $textArgs = [
        'tkn_lawCard' => $card->getId(),
      ];
      $card->discard($player, $text, $textArgs);
    } else {
      Notifications::message(clienttranslate('${player_name} does ${tkn_boldText_not} discard Royal Protection'), [
        'tkn_boldText_not' => clienttranslate('not'),
        'player' => $player,
      ]);
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => REVENUE_EMERGENCY_LOANS,
        'args' => [
          'remainingExpenses' => $args['remainingExpenses'],
        ]
      ]));
    }

    $this->resolveAction(['automatic' => true]);
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
    $args = $this->ctx->getArgs();
    $option = $args['option'];
    return $option === YES ? clienttranslate('Discard Royal Protection') : clienttranslate('Do not discard Royal Protection');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
