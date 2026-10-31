<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\Player;

class LawCard_47 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_47';
    $this->title = clienttranslate('Military Oversight');
    $this->background = 'Law2';
    $this->policyTarget = SHARE;
    $this->initialSupport = 5;
    $this->text = [
      clienttranslate('Immediately after Military Affairs acts, the Prime Minister may demote one Commander to an officer and then appoint a Commander from officers in that army following the rules for hiring and Nepotism.'),
    ];
  }

  public function getActingPlayerId(): int
  {
    return Parliament::getPrimeMinisterPlayerId();
  }

  private function getCommanders(): array
  {
    $commanders = Utils::filter(FamilyMembers::getAll()->toArray(), fn($fm) => $fm->isCommander());
    $order = fn($fm) => array_search(substr($fm->getLocation(), strlen('Commander_')), PRESIDENCIES);
    usort($commanders, fn($a, $b) => $order($a) <=> $order($b));
    return $commanders;
  }

  public function effectCanBeApplied(array $timingData): array | null
  {
    if (!$this->isInPlay()) {
      return null;
    }

    $commanders = $this->getCommanders();

    if (count($commanders) === 0) {
      return null;
    }

    return [
      PLAYER_ID => Parliament::getPrimeMinisterPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => LAW_CARD,
    ];
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    $playerId = $player->getId();
    $commanders = $this->getCommanders();
    

    $ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_XOR,
      'optional' => true,
      'children' => array_map(function ($commander) use ($playerId) {
        return [
          'action' => CHOOSE_FAMILY_MEMBER,
          'args' => [
            'familyMemberId' => $commander->getId(),
            'playerId' => $playerId,
            'source' => $this->getId()
          ]
        ];
      }, $commanders),
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Military Oversight: ${you} may choose a Commander to demote'),
        'description' => clienttranslate('Military Oversight: ${actplayer} may choose a Commander to demote'),
      ],
    ]));
  }
}
