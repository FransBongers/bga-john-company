<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\SetupCard;

class Bonuses extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_BONUSES;
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


  public function stBonuses()
  {
    $players = Players::getAll();
    $inclosureActs = LawCards::isInPlay(INCLOSURE_ACTS_ID);

    foreach ($players as $playerId => $player) {
      $bonuses = 0;
      $enterprises = $player->getEnterprises();
      Notifications::log('enterprises', ['playerId' => $playerId, 'enterprises' => $enterprises]);
      foreach ($enterprises as $enterprise) {
        $bonuses += $enterprise->getBonus();
      }
      if ($inclosureActs) {
        $prizeMembers = Utils::filter(FamilyMembers::getAll()->toArray(), function ($familyMember) use ($playerId) {
          return $familyMember->getPlayerId() === $playerId && array_key_exists($familyMember->getLocation(), PRIZES);
        });
        $bonuses += count($prizeMembers);
      }
      if ($bonuses > 0) {
        $player->gainCash($bonuses);
      }
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

}
