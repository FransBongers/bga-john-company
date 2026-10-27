<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PowerMarkers;
use Bga\Games\JohnCompany\Models\Player;

class ParliamentMeetsResolvePolicy extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_RESOLVE_POLICY;
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

  public function stParliamentMeetsResolvePolicy()
  {
    $dial = Parliament::getDialPosition();
    $policy = PRIME_MINISTER_DIAL[$dial];

    switch ($policy[CONSEQUENCE]) {
      case BONUS:
        $this->resolveBonus($policy[TARGET]);
        break;
      case POWER:
        PowerMarkers::swapWithNextHighest($this->ctx, Parliament::getPrimeMinisterPlayer(), $policy[TARGET]);
        break;
      case TAX:
        $this->resolveTax($policy[TARGET], $policy[WINDOW_TAX] ?? false);
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

  private function resolveBonus(string $target)
  {
    $playerOrder = Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId());
    $players = Players::getAll();

    $someoneGotMoney = false;

    foreach ($playerOrder as $playerId) {
      $player = $players[$playerId];
      $family = $player->getFamily();
      $familyId = $family->getId();

      if ($target === SHARE) {
        $count = count(Company::getShares($familyId));
      } else {
        $count = 0;
        foreach ($family->getEnterprises() as $enterprise) {
          if ($enterprise->getType() === $target) {
            $count++;
          }
        }
        foreach ($player->getLondonSeasonCards() as $card) {
          if ($card->getEnterpriseType() === $target) {
            $count++;
          }
        }
      }

      if ($count > 0) {
        $family->gainCash($count);
        $someoneGotMoney = true;
      }
    }
    if (!$someoneGotMoney) {
      Notifications::message(clienttranslate('No one receives a bonus'));
    }
  }

  private function resolveTax(string $target, bool $windowTax)
  {
    $this->ctx->insertAsBrother(new LeafNode([
      'action' => PRE_TAX_AND_UPKEEP,
      'args' => [
        'target' => $target,
        'windowTaxMultiplier' => $windowTax ? 1 : 0,
        'type' => TAX,
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
    return clienttranslate('ParliamentMeetsResolvePolicy');
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
