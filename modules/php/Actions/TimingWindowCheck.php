<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\BlackmailCards;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\TimingPreferences;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\BlackmailCard;

/**
 * Check if effects of Promise Cards, Blackmail Cards, Law Cards can be applied
 */
class TimingWindowCheck extends \Bga\Games\JohnCompany\Models\AtomicAction
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
    $timingData = $args[TIMING_DATA] ?? [];

    $options = [];

    foreach ([LondonSeasonCards::getAll(), LawCards::getAll()] as $cards) {
      foreach ($cards as $card) {
        if (!array_intersect($args[TIMING_WINDOW] ?? [], $card->getTimingWindows())) {
          continue;
        }
        if (in_array(WHEN_TAKEN_FROM_DISPLAY, $args[TIMING_WINDOW] ?? [], true)
          && $card->getId() !== ($timingData[CARD_ID] ?? null)) {
          continue;
        }
        $effect = $card->effectCanBeApplied($timingData);
        if ($effect !== null) {
          $effect[TIMING_DATA] = $effect[TIMING_DATA] ?? $timingData;
          $options[] = $effect;
        }
      }
    }

    foreach (PromiseCards::getAll() as $card) {
      if (!array_intersect($args[TIMING_WINDOW] ?? [], $card->getTimingWindows())) {
        continue;
      }
      if (!ctype_digit((string) $card->getLocation())) {
        continue;
      }
      $effect = $card->effectCanBeApplied($timingData);
      if ($effect !== null) {
        $effect[TIMING_DATA] = $effect[TIMING_DATA] ?? $timingData;
        $options[] = $effect;
      }
    }

    $activePlayerIds = $this->getActingPlayerIds($options, $args[TIMING_WINDOW] ?? [], $timingData);
    if (count($activePlayerIds) > 0) {
      if (!in_array(WHEN_TAKEN_FROM_DISPLAY, $args[TIMING_WINDOW] ?? [], true)) {
        $options = $this->addAnytimeOptions($options, $activePlayerIds, $args[TIMING_WINDOW] ?? [], $timingData);
      }
      // Insert node when there are applicable options
      $action =  [
        'action' => TIMING_WINDOW_ACT,
        'playerId' => 'some',
        'activePlayerIds' => $activePlayerIds,
        'optional' => true,
        'args' => [
          'options' => array_values(array_filter($options, fn($option) => in_array($option[PLAYER_ID], $activePlayerIds, true)))
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


  private function getActingPlayerIds(array $options, array $windows, array $timingData): array
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
        if ($window !== WHEN_TAKEN_FROM_DISPLAY && ($preferences['window'][TimingPreferences::windowKey($window, $timingData)] ?? false)) {
          $activePlayerIds[] = $playerId;
          break;
        }
      }
    }

    return array_unique($activePlayerIds);
  }

  private function addAnytimeOptions(array $options, array $activePlayerIds, array $windows, array $timingData): array
  {
    $phases = [LONDON_SEASON, FAMILY, FIRMS, HIRING, CHAIRMAN, DIRECTOR_OF_TRADE, GOVERNOR_GENERAL,
      MANAGER_OF_SHIPPING, MILITARY_AFFAIRS, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY, BENGAL_PRESIDENCY,
      SUPERINTENDENT_OF_TRADE_IN_CHINA, BONUSES, REVENUE, EVENTS_IN_INDIA, PARLIAMENT_MEETS, UPKEEP_AND_REFRESH];
    $phaseIndex = array_search(Globals::getPhase(), $phases, true);
    if ($phaseIndex === false) {
      return $options;
    }

    $anytimeData = array_merge($timingData, [
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
        $effect[TIMING_DATA] = $anytimeData;
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
