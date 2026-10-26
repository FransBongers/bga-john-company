<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PowerMarkers;
use Bga\Games\JohnCompany\Models\Player;

class SwapPowerMarkers extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_SWAP_POWER_MARKERS;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsSwapPowerMarkers()
  {
    $args = $this->ctx->getArgs();
    $notSwappable = $args['notSwappable'] ?? [];

    $options = $this->getOptions($notSwappable);

    $data = [
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

  public function actPassSwapPowerMarkers()
  {
    $player = self::getPlayer();
    $this->resolveAction(PASS);
  }

  public function actSwapPowerMarkers($args)
  {
    self::checkAction('actSwapPowerMarkers');
    $playerId = $this->checkPlayer();

    $markers = $args->selectedPowerMarkers;
    $options = $this->argsSwapPowerMarkers()['options'];

    if (count($markers) !== 2 || !in_array($markers[1], $options[$markers[0]] ?? [])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_068");
    }

    PowerMarkers::swap(Players::get($playerId), $markers);
    Notifications::updatePower();

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

  private function getOptions(array $notSwappable): array
  {
    $powerMarkers = PowerMarkers::get();
    $p = fn(int $n) => Locations::powerTokenPosition($n);
    $adjacent = [
      $p(1) => [$p(2)],
      $p(2) => [$p(1), $p(3), $p(4)],
      $p(3) => [$p(2), $p(4)],
      $p(4) => [$p(2), $p(3)],
    ];

    $options = [];
    foreach ($powerMarkers as $location => $marker) {
      if (in_array($marker, $notSwappable)) {
        continue;
      }
      $targets = [];
      foreach ($adjacent[$location] as $adjacentLocation) {
        $other = $powerMarkers[$adjacentLocation];
        if (!in_array($other, $notSwappable)) {
          $targets[] = $other;
        }
      }
      if (!empty($targets)) {
        $options[$marker] = $targets;
      }
    }
    return $options;
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
    return clienttranslate('SwapPowerMarkers');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
