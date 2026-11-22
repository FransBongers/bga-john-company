<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Models\Player;

class EnvoyToTheMughals extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [END_OF_PHASE];

  public function canBePlayedAnytime(array $anytimeData): bool
  {
    $result = $anytimeData['beforeEvents'] ?? false;
    Notifications::log("canBePlayedAnytime Envoy", $result);
    return $result;
  }

  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    return ($timingWindow === ANYTIME) || ($itemId === BONUSES)
      ? parent::effectCanBeApplied($timingWindow, $itemId)
      : null;
  }

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Envoy to the Mughals');
    $this->text = [
      clienttranslate('Play anytime on a turn before the Events in India phase. Move the Elephant to any legal position and then take £ equal to the highest open order in the region with the Elephant\'s tail.')
    ];
  }
  
  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $ctx->insertBefore(new LeafNode([
      'action' => MOVE_ELEPHANT,
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()]
    ]));
  }
}
