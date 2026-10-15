<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;

class ExhaustArmyPieces extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected function exhaustArmyPieces(array $stateArgs, array $armyPieces, array $officers)
  {
    $selectedPieces = [];
    $selectedStrength = 0;

    foreach ($armyPieces as $pieceId) {
      if (!isset($stateArgs['armyPieces'][$pieceId])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_050");
      }
      $piece = $stateArgs['armyPieces'][$pieceId];
      $piece->setLocation(Locations::armyOfExhausted($stateArgs['presidencyId']));
      $selectedStrength += $piece->getStrength();
      $selectedPieces[] = $piece;
    }

    foreach ($officers as $pieceId) {
      if (!isset($stateArgs['officers'][$pieceId])) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_051");
      }
      $officer = $stateArgs['officers'][$pieceId];
      $officer->setLocation(Locations::armyOfExhausted($stateArgs['presidencyId']));
      $selectedStrength++;
      $selectedPieces[] = $officer;
    }

    return [$selectedPieces, $selectedStrength];
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
