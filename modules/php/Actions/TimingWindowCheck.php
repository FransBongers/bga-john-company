<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\TimingPreferences;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\BlackmailCard;

/**
 * Check if any timing window effects can be applied or if players have set alerts
 */
class TimingWindowCheck extends \Bga\Games\JohnCompany\Actions\TimingWindow
{
  public function getState()
  {
    return ST_TIMING_WINDOW_CHECK;
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

  public function stTimingWindowCheck()
  {
    $args = $this->ctx->getArgs();
    $itemId = $args[ITEM_ID] ?? null;
    $timingWindow = $args[TIMING_WINDOW];

    $options = $this->getOptionsForTimingWindow($timingWindow, $itemId);

    $activePlayerIds = $this->getActingPlayerIds($options, [$timingWindow], $itemId);
    if (count($activePlayerIds) > 0) {
      // if ($timingWindow !== WHEN_TAKEN_FROM_DISPLAY) {
      //   $options = $this->addAnytimeOptions($options, $activePlayerIds, [$timingWindow], $timingData);
      // }
      // Insert node when there are applicable options
      $action =  [
        'action' => TIMING_WINDOW_ACT,
        'playerId' => 'some',
        'activePlayerIds' => $activePlayerIds,
        'optional' => true,
        'args' => [
          TIMING_WINDOW => $timingWindow,
          ITEM_ID => $itemId,
        ]
      ];
      $this->ctx->insertAsBrother(new LeafNode($action));
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


  private function getActingPlayerIds(array $options, array $windows, string | int | null $itemId): array
  {
    $activePlayerIds = [];
    foreach (Players::getAll() as $player) {
      $playerId = $player->getId();
      $preferences = TimingPreferences::forPlayer($playerId);
      foreach ($options as $option) {
        if ($option[PLAYER_ID] === $playerId && ($preferences['card'][$option[CARD_ID]] ?? true)) {
          $activePlayerIds[] = $playerId;
          continue 2;
        }
      }
      foreach ($windows as $window) {
        if ($window !== WHEN_TAKEN_FROM_DISPLAY && ($preferences['window'][TimingPreferences::windowKey($window, $itemId)] ?? false)) {
          $activePlayerIds[] = $playerId;
          break;
        }
      }
    }

    return array_unique($activePlayerIds);
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
    return clienttranslate('TimingWindowCheck');
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
