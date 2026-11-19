<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PromiseCards;
use Bga\Games\JohnCompany\Models\Player;

class TimingWindowAct extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_TIMING_WINDOW_ACT;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTimingWindowAct()
  {
    $args = $this->ctx->getArgs();
    $options = $args['options'] ?? [];

    $private = [];

    foreach ($this->getActivePlayerIds() as $playerId) {
      $private[$playerId] = [];
    }

    foreach ($options as $option) {
      $playerId = $option[PLAYER_ID];

      if (!isset($private[$playerId])) {
        $private[$playerId] = [];
      }
      $private[$playerId][] = $option;
    }

    $resolved = $this->ctx->getInfo()['resolved'] ?? [];
    foreach ($private as $playerId => &$playerOptions) {
      foreach ($playerOptions as $index => &$option) {
        $option['resolved'] = $resolved[$playerId][$index] ?? false;
      }
      unset($option);
    }
    unset($playerOptions);

    $data = [
      '_private' => $private,
      'debug' => $this->ctx->getParent()->getUnresolvedActions([LONDON_SEASON_CHOOSE_CARD])
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

  public function actPassTimingWindowAct()
  {
    $playerId = $this->checkPlayer();
    $this->setPlayerActionCompleted($playerId);
    if (count(array_diff($this->getActivePlayerIds(), $this->ctx->getInfo()['completedPlayerIds'] ?? [])) === 0) {
      $this->resolveAction(PASS, true);
    }
  }

  public function actTimingWindowAct($args)
  {
    self::checkAction('actTimingWindowAct');
    $playerId = $this->checkPlayer();
    $use = $args->use ?? false;
    $index = $args->index ?? null;

    $stateArgs = $this->argsTimingWindowAct();

    if (!$use) {
      $this->setAllEffectsResolved($playerId, $stateArgs['_private'][$playerId]);
      $this->setPlayerActionCompleted($playerId);
    } else {
      $effect = $stateArgs['_private'][$playerId][$index] ?? null;
      $resolved = $this->ctx->getInfo()['resolved'] ?? [];
      if ($effect === null || ($resolved[$playerId][$index] ?? false)) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_074");
      }
      $this->checkEffectStillAvailable($playerId, $effect);
      $this->resolveEffect($playerId, $effect);
      $this->setEffectResolved($playerId, $index);
    }

    if (count(array_diff($this->getActivePlayerIds(), $this->ctx->getInfo()['completedPlayerIds'] ?? [])) === 0) {
      $this->resolveAction([], true);
      return;
    }
    Engine::proceed();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function resolveEffect(int $playerId, array $effect)
  {
    $player = Players::get($playerId);
    $cardId = $effect[CARD_ID];
    $cardType = $effect[CARD_TYPE];
    $timingData = $effect[TIMING_DATA] ?? [];
    if ($cardType === LAW_CARD) {
      LawCards::get($cardId)->applyEffect($this->ctx, $player, $timingData);
    } else if ($cardType === PROMISE_CARD) {
      PromiseCards::get($cardId)->applyEffect($this->ctx, $player, $timingData);
    } else if ($cardType === BLACKMAIL_CARD) {
      $this->resolveBlackmailCard($player, $effect);
      // Notifications::message(clienttranslate('Applying effect of Company Fraud card'));
      // LondonSeasonCards::get($cardId)->applyEffect($this->ctx, $player, $timingData);
    }
  }

  private function checkEffectStillAvailable(int $playerId, array $effect): void
  {
    $cardId = $effect[CARD_ID];
    $cardType = $effect[CARD_TYPE];
    if ($cardType === LAW_CARD) {
      $card = LawCards::get($cardId);
    } else if ($cardType === PROMISE_CARD) {
      $card = PromiseCards::get($cardId);
      if (!ctype_digit((string) $card->getLocation())) {
        throw new \BgaUserException(clienttranslate('This card is no longer available'));
      }
    } else {
      $card = LondonSeasonCards::get($cardId);
    }
    $currentEffect = $card->effectCanBeApplied($effect[TIMING_DATA] ?? []);
    if ($currentEffect === null || $currentEffect[PLAYER_ID] !== $playerId) {
      throw new \BgaUserException(clienttranslate('This card effect is no longer available'));
    }
  }

  private function resolveBlackmailCard(Player $player, array $effect)
  {
    $cardId = $effect[CARD_ID];
    $cardType = $effect[CARD_TYPE];
    $timingData = $effect[TIMING_DATA] ?? [];

    $card = LondonSeasonCards::get($cardId);
    $card->play($player);

    $manOnTheInsideCard = LondonSeasonCards::get(MAN_ON_THE_INSIDE_ID);
    if ($manOnTheInsideCard->canBePlayed($player)) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => USE_MAN_ON_THE_INSIDE,
        'playerId' => 'some',
        'activePlayerIds' => [$manOnTheInsideCard->getActingPlayerId()],
        'args' => [
          'effect' => $effect
        ],
      ]));
    } else {
      // Card cannot be cancelled, so apply its effect immediately
      LondonSeasonCards::get($cardId)->applyEffect($this->ctx, $player, $timingData);
    }
  }

  private function setEffectResolved(int $playerId, int $index)
  {
    $resolved = $this->ctx->getInfo()['resolved'] ?? [];
    if (!isset($resolved[$playerId])) {
      $resolved[$playerId] = [];
    }
    $resolved[$playerId][$index] = true;
    $this->ctx->updateInfo('resolved', $resolved);
    Engine::save();
  }

  private function setAllEffectsResolved(int $playerId, array $playerEffects)
  {
    foreach ($playerEffects as $index => $effect) {
      $this->setEffectResolved($playerId, $index);
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
    return clienttranslate('TimingWindowAct');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
