<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\Player;

class LettersOfIntroduction extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [WHEN_RETIRING];

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Letters of Introduction');
    $this->power = 1;
    $this->text = [
      [
        'log' => clienttranslate('Play when retiring one or more pieces ${tkn_italicText_minZero}. Act as if you also have retirement discounts equal to those on all other players\' spouses.'),
        'args' => [
          'tkn_italicText_minZero' => clienttranslate('(in London Season or Final Scoring)')
        ]
      ]
    ];
  }


  /**
   * Whether the effect of this london season card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    if (!Utils::startsWith($this->getLocation(), 'londonSeasonCards_')) {
      return null;
    }

    $actingPlayerId = $this->getActingPlayerId();
    if ($actingPlayerId !== $itemId) {
      return null;
    }

    return parent::effectCanBeApplied($timingWindow, $itemId);
  }

  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $retireNodes = $ctx->getParent()->getUnresolvedActions([LONDON_SEASON_RETIRE]);
    // Separate sequence node for hiring family member actions, so there should only be one unresolved action at this point
    if (count($retireNodes) !== 1) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_082");
    }
    $node = $retireNodes[0];
    $args = $node->getArgs();
    $args[LETTERS_OF_INTRODUCTION_ID] = true;
    $node->updateInfo('args', $args);
    Engine::save();
  }
}
