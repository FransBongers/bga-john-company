<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\BlackmailCards;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Models\Player;

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

    foreach (($args[BLACKMAIL_CARD] ?? []) as $blackmailCardId) {
      $blackmailCardEffect = $this->checkBlackmailCard($blackmailCardId, $timingData);

      $options = array_merge($options, $blackmailCardEffect);
    }

    foreach (($args[LAW_CARD] ?? []) as $lawCardId) {
      $lawCardEffect = $this->checkLawCard($lawCardId, $timingData);

      $options = array_merge($options, $lawCardEffect);
    }

    foreach (($args[PROMISE_CARD] ?? []) as $promiseCardType) {
      $checkResult = $this->checkPromiseCard($promiseCardType, $timingData);

      $options = array_merge($options, $checkResult);
    }

    if (count($options) > 0) {
      // Insert node when there are applicable options
      $action =  [
        'action' => TIMING_WINDOW_ACT,
        'playerId' => 'some',
        'activePlayerIds' => $this->getActingPlayerIds($options),
        'optional' => true,
        'args' => [
          'options' => $options
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


  private function checkBlackmailCard(string $blackmailCardId, array $timingData): array
  {
    $card = LondonSeasonCards::get($blackmailCardId);
    $effect = $card->effectCanBeApplied($timingData);

    return $effect !== null ? [$effect] : [];
  }

  private function checkLawCard(string $lawCardId, array $timingData): array
  {
    $lawCard = LawCards::get($lawCardId);
    $effect = $lawCard->effectCanBeApplied($timingData);

    return $effect !== null ? [$effect] : [];
  }

  private function checkPromiseCard(string $promiseCardType, array $timingData): array
  {
    // Implement the logic to check the effects of Promise Cards
    return [];
  }

  private function getActingPlayerIds(array $options): array
  {
    $activePlayerIds = [];

    foreach ($options as $option) {
      if (isset($option[PLAYER_ID])) {
        $activePlayerIds[] = $option[PLAYER_ID];
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
