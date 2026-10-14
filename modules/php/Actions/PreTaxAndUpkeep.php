<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;


class PreTaxAndUpkeep extends \Bga\Games\JohnCompany\Models\AtomicAction
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

    Notifications::log('stPreTaxAndUpkeep', ['type' => $type]);

    if ($type === UPKEEP) {
      $this->resolveUpkeep();
    }

    $data = [];

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function resolveUpkeep()
  {
    $playersThatCannotPayUpkeep = [];

    $primeMinisterPlayerId = Parliament::getPrimeMinisterPlayerId();
    foreach (Players::getTurnOrder($primeMinisterPlayerId) as $playerId) {
      $player = Players::get($playerId);
      $family = $player->getFamily();
      $familyId = $family->getId();

      $upkeep = 0;
      foreach (FamilyMembers::getAllFor($familyId) as $familyMember) {
        $location = $familyMember->getLocation();
        if (array_key_exists($location, PRIZES)) {
          $upkeep += PRIZES[$location][UPKEEP];
        }
      }

      Notifications::log('resolveUpkeep', ['playerId' => $playerId, 'upkeep' => $upkeep]);

      if ($upkeep === 0) {
        continue;
      }

      if ($family->getTreasury() < $upkeep) {
        $playersThatCannotPayUpkeep[] = $playerId;
        continue;
      }

      $family->pay($upkeep, false);
    }

    if (count($playersThatCannotPayUpkeep) > 0) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => TAX_AND_UPKEEP,
        'playerId' => 'some',
        'activePlayerIds' => $playersThatCannotPayUpkeep,
        'args' => [
          'type' => UPKEEP
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
