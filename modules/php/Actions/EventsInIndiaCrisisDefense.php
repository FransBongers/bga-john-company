<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\AtomicActions;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Orders;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\ResolveCrisis;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\Office;

class EventsInIndiaCrisisDefense extends ExhaustArmyPieces
{
  public function getState()
  {
    return ST_EVENTS_IN_INDIA_CRISIS_DEFENSE;
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


  public function stEventsInIndiaCrisisDefense() {}

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsEventsInIndiaCrisisDefense()
  {
    $info = $this->ctx->getInfo();
    // $player = self::getPlayer();
    $activePlayerId = $info['activePlayerIds'][0];
    $defenderId = $info['defenderId']; // regionId?

    $region = Regions::get($defenderId);
    $presidencyId = $region->getControllingPresidencyId();

    $data = [
      'attackerStrength' => $info['attackerStrength'],
      'attackerId' => $info['attackerId'],
      'defenderId' => $info['defenderId'],
      'armyPieces' => ArmyPieces::getInLocation(Locations::armyOfReady($presidencyId)),
      'officers' => FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId)),
      'presidencyId' => $presidencyId,
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

  public function actPassEventsInIndiaCrisisDefense()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS, true);
  }

  public function actEventsInIndiaCrisisDefense($args)
  {
    self::checkAction('actEventsInIndiaCrisisDefense');
    $playerId = $this->checkPlayer();

    $armyPieces = $args->armyPieces;
    $officers = $args->officers;
    $stateArgs = $this->argsEventsInIndiaCrisisDefense();

    list($selectedPieces, $selectedStrength) = $this->exhaustArmyPieces($stateArgs, $armyPieces, $officers);

    $player = Players::get($playerId);
    Notifications::exhaustPieces($player, $selectedPieces);

    if ($selectedStrength >= $stateArgs['attackerStrength']) {
      Notifications::message(clienttranslate('The attack ${tkn_boldText_failed}'), [
        'tkn_boldText_failed' => clienttranslate('failed'),
        'i18n' => ['tkn_boldText_failed']
      ]);
      Regions::get($stateArgs['defenderId'])->removeUnrest();
      // TODO: commander should get a trophy
    } else {
      ResolveCrisis::performRegionLossSteps($stateArgs['defenderId'], $stateArgs['attackerId']);
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
