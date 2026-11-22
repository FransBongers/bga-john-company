<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Models\Player;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;

class ThePrimeMinistersEar extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [START_OF_PHASE];

  public function canBePlayedAnytime(array $anytimeData): bool
  {
    return $anytimeData['beforeFamily'] ?? false;
  }

  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    if ($timingWindow === START_OF_PHASE && $itemId !== FAMILY) {
      return null;
    }

    return parent::effectCanBeApplied($timingWindow, $itemId);
  }

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate("The Prime Minister's Ear");
    $this->power = 2;
    $this->text = [
      clienttranslate('Play anytime on a turn before the Family phase to swap two adjacent power markers.')
    ];
  }

  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $ctx->insertBefore(new LeafNode([
      'action' => SWAP_POWER_MARKERS,
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()],
      'args' => [
        'notSwappable' => [],
      ]
    ]));
  }
}
