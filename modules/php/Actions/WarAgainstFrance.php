<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Player;

class WarAgainstFrance extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_WAR_AGAINST_FRANCE;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsWarAgainstFrance()
  {
    $args = $this->ctx->getArgs();

    $officers = FamilyMembers::getOfficers();
    $regiments = ArmyPieces::getRegimentsInArmies();
    $ships = Utils::filter(Ships::getShipsInSeaZones(), function ($ship) {
      if ($ship->isOtherShip() && $ship->getSide() === EXTRA_SHIP) {
        return false;
      }
      return true;
    });

    $data = [
      'regiments' => $regiments,
      'officers' => $officers,
      'ships' => $ships,
      'requiredShips' => min(count($ships), 3),
      'requiredOfficersAndRegiments' => min(count($officers) + count($regiments), 3),
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

  public function actPassWarAgainstFrance()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actWarAgainstFrance($args)
  {
    self::checkAction('actWarAgainstFrance');
    $playerId = $this->checkPlayer();

    // Ids of officers and regiments
    $officersAndRegiments = $args->officersAndRegiments;
    // Ids of ships
    $ships = $args->ships;

    $stateArgs = $this->argsWarAgainstFrance();
    $player = Players::get($playerId);

    foreach ($officersAndRegiments as $id) {
      $isRegiment = Utils::startsWith($id, 'Regiment_');
      if ($isRegiment) {
        $this->returnRegiment($player, $stateArgs['regiments'], $id);
      } else {
        $this->returnOfficer($player, $stateArgs['officers'], $id);
      }
    }

    foreach ($ships as $id) {
      $this->returnShip($player, $stateArgs['ships'], $id);
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

  private function returnOfficer(Player $player, array $options, string $id)
  {
    $officer = Utils::array_find($options, fn($r) => $r->getId() === $id);
    if ($officer === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_078");
    }
    $officer->returnToSupply();
  }

  private function returnRegiment(Player $player, array $options, string $id)
  {
    $regiment = Utils::array_find($options, fn($r) => $r->getId() === $id);
    if ($regiment === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_079");
    }
    $regiment->returnToSupply($player);
  }

  private function returnShip(Player $player, array $options, string $id)
  {
    $ship = Utils::array_find($options, fn($r) => $r->getId() === $id);
    if ($ship === null) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_080");
    }
    if ($ship->isOtherShip()) {
      $ship->returnToSupply($player);
    } else {
      $ship->returnToShipyard($player);
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
    return clienttranslate('WarAgainstFrance');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
