<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Managers\PromiseCards;

class TimingWindow extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  protected function getOptionsForTimingWindow(string $timingWindow, string | int | null $itemId): array
  {
    $options = [];

    foreach ([LondonSeasonCards::getAll(), LawCards::getAll()] as $cards) {
      foreach ($cards as $card) {
        if (!array_intersect([$timingWindow], $card->getTimingWindows())) {
          continue;
        }
        if (
          $timingWindow === WHEN_TAKEN_FROM_DISPLAY
          && $card->getId() !== $itemId
        ) {
          continue;
        }
        $effect = $card->effectCanBeApplied($timingWindow, $itemId);
        if ($effect !== null) {
          $effect[ITEM_ID] = $effect[ITEM_ID] ?? $itemId;
          $effect['card'] = $card->getType() === BLACKMAIL ? $card->jsonSerializePrivate() : $card->jsonSerialize();
          $options[] = $effect;
        }
      }
    }

    foreach (PromiseCards::getAll() as $card) {
      if (!array_intersect([$timingWindow], $card->getTimingWindows())) {
        continue;
      }
      if (!ctype_digit((string) $card->getLocation())) {
        continue;
      }
      $effect = $card->effectCanBeApplied($timingWindow, $itemId);
      if ($effect !== null) {
        $effect[ITEM_ID] = $effect[ITEM_ID] ?? $itemId; // TODO: check what this does?
        $effect['card'] = $card->jsonSerialize();
        $options[] = $effect;
      }
    }
    return $options;
  }
}
