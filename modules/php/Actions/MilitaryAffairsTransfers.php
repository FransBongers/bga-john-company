<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class MilitaryAffairsTransfers extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_MILITARY_AFFAIRS_TRANSFERS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsMilitaryAffairsTransfers()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];

    $options = [
      'officers' => [],
      'regiments' => [],
    ];

    $armyLocations = array_map(function ($regionId) {
      return Locations::armyOf($regionId);
    }, HOME_REGIONS);

    $officers = FamilyMembers::getOfficers();
    /**
     * For each writer, options are the other two presidencies
     */
    foreach ($officers as $familyMember) {
      $options['officers'][$familyMember->getId()] = [
        'familyMember' => $familyMember,
        'locations' => Utils::filter($armyLocations, function ($location) use ($familyMember) {
          return $location !== $familyMember->getLocation();
        })
      ];
    }

    $regiments = ArmyPieces::getRegiments();
    /**
     * For each regiments, options are the other two presidencies
     */
    foreach ($regiments as $regiment) {
      if (!in_array($regiment->getLocation(), $armyLocations)) {
        continue;
      }
      $options['regiments'][$regiment->getId()] = [
        'regiment' => $regiment,
        'locations' => Utils::filter($armyLocations, function ($location) use ($regiment) {
          return $location !== $regiment->getLocation();
        })
      ];
    }

    $data = [
      'activePlayerIds' => [$activePlayerId],
      'options' => $options,
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

  public function actPassMilitaryAffairsTransfers()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actMilitaryAffairsTransfers($args)
  {
    self::checkAction('actMilitaryAffairsTransfers');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsMilitaryAffairsTransfers();

    $regimentTransfers = $args->transfers->regiments;
    $officerTransfers = $args->transfers->officers;

    $player = Players::get($playerId);

    foreach ($regimentTransfers as $regimentId => $data) {
      Notifications::log('regimentTransfer', $regimentId);
      $to = $data->to;
      if (!(isset($stateArgs['options']['regiments'][$regimentId]) && in_array($to, $stateArgs['options']['regiments'][$regimentId]['locations']))) {
        throw new \feException("ERROR_018");
      }
      $regiment = $stateArgs['options']['regiments'][$regimentId]['regiment'];
      $regiment->moveTo($player, $to);
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

}
