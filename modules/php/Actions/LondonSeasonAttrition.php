<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class LondonSeasonAttrition extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_LONDON_SEASON_ATTRITION;
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

  public function stLondonSeasonAttrition()
  {
    $chairmanOffice = Offices::get(CHAIRMAN);
    $playerIds = Players::getTurnOrder($chairmanOffice->getPlayerId());

    $allOffices = Offices::getAll()->toArray();
    $players = Players::getAll();

    $retireActions = [];

    foreach ($playerIds as $playerId) {
      $player = $players[$playerId];
      $offices = array_filter($allOffices, function ($office) use ($playerId) {
        return $office->getPlayerId() === $playerId;
      });

      $retiredAFamilyMember = false;

      foreach ($offices as $office) {
        $familyMember = $office->getFamilyMember();
        $fatigue = $familyMember->getFatigue();
        $modifier = $fatigue + ($office->getId() === CHAIRMAN ? 1 : 0);

        $dieResult = JoCoUtils::rollDie();
        $result = $dieResult + $modifier;

        Notifications::message(clienttranslate('${player_name} rolls ${tkn_boldText_dieResult} (+${tkn_boldText_modifier}) for ${tkn_boldText_office}'), [
          'player' => $player,
          'tkn_boldText_dieResult' => $dieResult,
          'tkn_boldText_modifier' => $modifier,
          'tkn_boldText_office' => $office->getTitle(),
          'i18n' => ['tkn_boldText_office'],
        ]);

        if ($result <= 2) {
          // Nothing happens
        } else if ($result <= 4) {
          $familyMember->incFatigue(1);
        } else {
          $familyMember->setFatigue(0);
          $familyMember->moveTo($player, Locations::pensioners(), [
            'skipFrom' => true
          ]);
          $office->moveToVacantOffices($player);
          $retiredAFamilyMember = true;
        }
      }

      if ($retiredAFamilyMember) {
        $retireActions[] = [
          'action' => LONDON_SEASON_RETIRE,
          'playerId' => 'some',
          'activePlayerIds' => [$playerId],
          'optional' => true,
          'args' => [
            'familyId' => $player->getFamilyId()
          ]
        ];
      }
    }

    if (count($retireActions) > 0) {
      $retireActions[] = [
        'action' => LONDON_SEASON_ORDER,
      ];
      $this->ctx->insertAsBrother(Engine::buildTree([
        'children' => $retireActions
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
    return clienttranslate('LondonSeasonAttrition');
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
