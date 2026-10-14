<?php

namespace Bga\Games\JohnCompany\Actions;

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

    $powerMarkers = PowerMarkers::get();
    $same = null;
    foreach ($powerMarkers as $location => $marker) {
      if (in_array($marker, $notSwappable)) {
        unset($powerMarkers[$location]);
      }
    }

    $data = [
      'options' => $powerMarkers,
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

    foreach ($markers as $marker) {
      $optionValues = array_values($options);
      if (!in_array($marker, $optionValues)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_068");
      }
    }

    PowerMarkers::swap(Players::get($playerId), $markers);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([]);
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
    return clienttranslate('SwapPowerMarkers');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
