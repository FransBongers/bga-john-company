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

    foreach ($options as $option) {
      $playerId = $option[PLAYER_ID];

      if (!isset($private[$playerId])) {
        $private[$playerId] = [];
      }
      $private[$playerId][] = $option;
    }

    $data = [
      '_private' => $private,
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
    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS, true);
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
    } else {
      $effect = $stateArgs['_private'][$playerId][$index] ?? null;
      if ($effect === null) {
        throw new \Bga\GameFramework\VisibleSystemException("ERROR_074");
      }
      $this->resolveEffect($playerId, $effect);
      $this->setEffectResolved($playerId, $index);
    }

    if ($this->allEffectsHaveBeenUsedOrSkipped($stateArgs['_private'])) {
      $this->setAllActivePlayerIdsNonMultiactive();
      $this->resolveAction([], true);
      return;
      // All effects have been used or skipped, you can perform additional logic here if needed
    }

    if ($this->playerHasUsedOrSkippedAllEffects($playerId, $stateArgs['_private'][$playerId])) {
      // The current player has used or skipped all effects, but other players still need to complete their effects
      Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
      $this->resolveAction([]);
      return;
    }
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

  private function playerHasUsedOrSkippedAllEffects(int $playerId, array $playerEffects): bool
  {
    $resolved = $this->ctx->getInfo()['resolved'] ?? [];
    foreach ($playerEffects as $index => $effect) {
      if (!isset($resolved[$playerId][$index]) || !$resolved[$playerId][$index]) {
        return false;
      }
    }
    return true;
  }

  private function allEffectsHaveBeenUsedOrSkipped(array $allPlayersEffects)
  {

    $resolved = $this->ctx->getInfo()['resolved'] ?? [];
    foreach ($allPlayersEffects as $playerId => $playerEffects) {
      foreach ($playerEffects as $index => $effect) {
        if (!isset($resolved[$playerId][$index]) || !$resolved[$playerId][$index]) {
          return false;
        }
      }
    }
    return true;
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
