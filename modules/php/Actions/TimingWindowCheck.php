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

  private function addAnytimeOptions(array $options, array $activePlayerIds, array $windows, string | int | null $itemId): array
  {
    $phases = [
      LONDON_SEASON,
      FAMILY,
      FIRMS,
      HIRING,
      CHAIRMAN,
      DIRECTOR_OF_TRADE,
      GOVERNOR_GENERAL,
      MANAGER_OF_SHIPPING,
      MILITARY_AFFAIRS,
      BOMBAY_PRESIDENCY,
      MADRAS_PRESIDENCY,
      BENGAL_PRESIDENCY,
      SUPERINTENDENT_OF_TRADE_IN_CHINA,
      BONUSES,
      REVENUE,
      EVENTS_IN_INDIA,
      PARLIAMENT_MEETS,
      UPKEEP_AND_REFRESH
    ];
    $phaseIndex = array_search(Globals::getPhase(), $phases, true);
    if ($phaseIndex === false) {
      return $options;
    }

    $anytimeData = array_merge([
      ITEM_ID => $itemId,
      'anytime' => true,
      'afterRevenue' => $phaseIndex > array_search(REVENUE, $phases, true)
        || (Globals::getPhase() === REVENUE && in_array(END_OF_PHASE, $windows, true)),
      'beforeEvents' => $phaseIndex < array_search(EVENTS_IN_INDIA, $phases, true),
      'beforeFamily' => $phaseIndex < array_search(FAMILY, $phases, true),
    ]);

    $cards = [];
    foreach (PromiseCards::getAll() as $card) {
      if (ctype_digit((string) $card->getLocation()) && $card->canBePlayedAnytime($anytimeData)) {
        $cards[] = $card;
      }
    }
    foreach (LondonSeasonCards::getAll() as $card) {
      if (!$card instanceof BlackmailCard || !str_starts_with($card->getLocation(), 'londonSeasonCards_')) {
        continue;
      }
      if ($card->canBePlayedAnytime($anytimeData)) {
        $cards[] = $card;
      }
    }

    foreach ($cards as $card) {
      if (!in_array($card->getActingPlayerId(), $activePlayerIds, true)) {
        continue;
      }
      $effect = $card->effectCanBeApplied($anytimeData);
      if ($effect === null) {
        continue;
      }
      $alreadyOffered = array_filter($options, fn($option) => $option[PLAYER_ID] === $effect[PLAYER_ID] && $option[CARD_ID] === $effect[CARD_ID]);
      if (!$alreadyOffered) {
        $effect[ITEM_ID] = $anytimeData;
        $options[] = $effect;
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
