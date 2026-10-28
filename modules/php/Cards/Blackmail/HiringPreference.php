<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class HiringPreference extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Hiring Preference');
    $this->power = 1;
    $this->text = [
      clienttranslate('Play during hiring if you are a candidate. The hiring player must choose you. You may use this to ignore the Nepotism rule.')
    ];
  }

  /**
   * Whether the effect of this london season card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(array $timingData): array | null
  {
    // Has to be owned by a player
    if (!Utils::startsWith($this->getLocation(), 'londonSeasonCards_')) {
      return null;
    }

    $actingPlayerId = $this->getActingPlayerId();

    $officeId = $timingData['officeId'];

    $office = Offices::get($officeId);
    $candidates = $office->getCandidatesForHiring();

    $playerIsCandidate = false;
    $otherCandidate = false;

    foreach ($candidates as $candidate) {
      if ($candidate->getPlayerId() === $actingPlayerId) {
        $playerIsCandidate = true;
      } else {
        $otherCandidate = true;
      }
    }

    if (!$playerIsCandidate || !$otherCandidate) {
      return null;
    }

    return [
      PLAYER_ID => $this->getActingPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => BLACKMAIL_CARD,
    ];
  }

  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, array $timingData) {
    $hiringNodes = $ctx->getParent()->getUnresolvedActions([HIRING_HIRE_FAMILY_MEMBER]);
    // Separate sequence node for hiring family member actions, so there should only be one unresolved action at this point
    if (count($hiringNodes) !== 1) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_081");
    }
    $node = $hiringNodes[0];
    $args = $node->getArgs();
    $args['familyIdFilter'] = [$player->getFamilyId()];
    $node->updateInfo('args', $args);
    Engine::save();
  }
}
