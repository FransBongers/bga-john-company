<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;


class PreTaxAndUpkeep extends \Bga\Games\JohnCompany\Actions\TaxAndUpkeepBase
{
  public function getState()
  {
    return ST_PRE_TAX_AND_UPKEEP;
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

  public function stPreTaxAndUpkeep()
  {
    $args = $this->ctx->getArgs();
    $type = $args['type'];
    $target = $args['target'] ?? null;

    $primeMinisterPlayerId = Parliament::getPrimeMinisterPlayerId();
    $playerIdsInTurnOrder = Players::getTurnOrder($primeMinisterPlayerId);
    $players = Players::getAll();
    $playersInPrimeMinisterOrder = [];
    foreach ($playerIdsInTurnOrder as $playerId) {
      $playersInPrimeMinisterOrder[] = $players[$playerId];
    }

    switch ($type) {
      case WINDOW_TAX:
        Notifications::nextPhase(clienttranslate('Window Tax'));
        $this->resolveTaxOrUpkeep($this->getWindowCount($playersInPrimeMinisterOrder), WINDOW_TAX, $target);
        break;
      case UPKEEP:
        $this->resolveTaxOrUpkeep($this->getUpkeep($playersInPrimeMinisterOrder), UPKEEP, $target);
        break;
      case TAX:
        Notifications::nextPhase(clienttranslate('Tax ${tkn_icon}'), [
          'tkn_icon' => $target,
        ]);
        $this->resolveTaxOrUpkeep($this->getTax($playersInPrimeMinisterOrder, $target), TAX, $target);
        break;
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

  private function resolveTaxOrUpkeep(array $dataPerPlayer, string $type, string | null $target)
  {
    $playersThatCannotPay = [];

    foreach ($dataPerPlayer as $data) {
      $player = $data['player'];
      $amount = $data['amount'];
      $playerExtra = $player->getPlayerExtra();

      if ($amount === 0) {
        continue;
      }

      if ($playerExtra->getTreasury() < $amount) {
        $playersThatCannotPay[] = $player->getId();
        continue;
      }

      $playerExtra->pay($amount, false);
    }

    if (count($playersThatCannotPay) > 0) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => TAX_AND_UPKEEP,
        'playerId' => 'some',
        'activePlayerIds' => $playersThatCannotPay,
        'args' => [
          'type' => $type,
          'target' => $target
        ],
      ]));
    }
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
    return clienttranslate('PreTaxAndUpkeep');
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
