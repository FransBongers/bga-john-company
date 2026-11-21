<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Models\Player;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;

class ThePrimeMinistersEar extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [START_OF_PHASE];

  public function canBePlayedAnytime(array $timingData): bool
  {
    return $timingData['beforeFamily'] ?? false;
  }

  public function effectCanBeApplied(string | int | null $itemId): array | null
  {
    // TODO: check anytime timing windows
    //   return ($timingData['anytime'] ?? false) || ($timingData[PHASE_ID] ?? null) === FAMILY
    // ? parent::effectCanBeApplied($timingData)
    return $itemId === 'anytime' || $itemId === FAMILY
      ? parent::effectCanBeApplied($itemId)
      : null;
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
    $ctx->insertAsBrother(new LeafNode([
      'action' => SWAP_POWER_MARKERS,
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()],
      'args' => [
        'notSwappable' => [],
      ]
    ]));
  }
}
