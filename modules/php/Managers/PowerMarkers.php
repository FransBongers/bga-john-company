<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Models\Player;

class PowerMarkers
{
  public static function setupNewGame()
  {
    // TODO: change global name
    Globals::setPowerMarkers([
      Locations::powerTokenPosition(1) => POWER_TOKEN_SOCIAL,
      Locations::powerTokenPosition(2) => POWER_TOKEN_COMPANY_SHARE,
      Locations::powerTokenPosition(3) => POWER_TOKEN_SHIPPING,
      Locations::powerTokenPosition(4) => POWER_TOKEN_MANUFACTURING,
    ]);
  }

  public static function get()
  {
    return Globals::getPowerMarkers();
  }

  public static function getNextHigherPosition(string $position)
  {
    switch ($position) {
      case Locations::powerTokenPosition(2):
        return Locations::powerTokenPosition(1);
      case Locations::powerTokenPosition(3):
      case Locations::powerTokenPosition(4):
        return Locations::powerTokenPosition(2);
      default:
        return null;
    }
  }

  public static function swap(Player $player, array $markers)
  {
    $powerMarkers = self::get();
    $flipped = array_flip($powerMarkers);
    
    $positions = array_map(fn($type) => $flipped[$type], $markers);

    $changes = [];

    $temp = $powerMarkers[$positions[0]];
    $powerMarkers[$positions[0]] = $powerMarkers[$positions[1]];
    $changes[$positions[0]] = $powerMarkers[$positions[1]];
    $powerMarkers[$positions[1]] = $temp;
    $changes[$positions[1]] = $temp;
    Globals::setPowerMarkers($powerMarkers);
    Notifications::swapPowerMarkers($player, $markers[0], $markers[1], $changes);
  }

  public static function swapWithNextHighest(object $ctx, Player $player, string $type)
  {
    $powerMarkers = self::get();
    $flipped = array_flip($powerMarkers);
    $position = $flipped[$type];

    $nextHigherPosition = self::getNextHigherPosition($position);

    $changes = [];

    if ($nextHigherPosition !== null) {
      $temp = $powerMarkers[$position];
      $powerMarkers[$position] = $powerMarkers[$nextHigherPosition];
      $changes[$position] = $powerMarkers[$nextHigherPosition];
      $powerMarkers[$nextHigherPosition] = $temp;
      $changes[$nextHigherPosition] = $temp;
      Globals::setPowerMarkers($powerMarkers);

      Notifications::swapPowerMarkers($player, $type, $changes[$position], $changes);
      Notifications::updatePower();
    } else {
      Notifications::message(clienttranslate('${tkn_powerMarker} is already in the highest position'), [
        'tkn_powerMarker' => $type,
      ]);
      $ctx->insertAsBrother(new LeafNode([
        'action' => SWAP_POWER_MARKERS,
        'playerId' => 'some',
        'activePlayerIds' => [$player->getId()],
        'args' => [
          'notSwappable' => [$type],
        ]
      ]));
    }
  }
}
