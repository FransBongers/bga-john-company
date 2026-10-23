<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\Player;

class LawCard_34 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_34';
    $this->title = clienttranslate('Board of Control');
    $this->background = 'Law2';
    $this->policyConsequence = POWER;
    $this->initialSupport = 0;
    $this->text = [
      clienttranslate('Once per turn, after any office except the Chairman has finished acting, the Prime Minister may remove its officeholder. The piece is returned to its supply and the office card is added to the Vacant Offices box.'),
    ];
  }

  public function getActingPlayerId(): int
  {
    return Parliament::getPrimeMinisterPlayerId();
  }

  public function effectCanBeApplied(array $timingData): array | null
  {
    if (!$this->isInPlay() || $this->hasBeenUsed()) {
      return null;
    }

    $officeId = $timingData[OFFICE_ID] ?? null;
    if ($officeId === null) {
      return null;
    }

    $officeHasFamilyMember = Offices::get($officeId)->getFamilyMemberId() !== null;
    if (!$officeHasFamilyMember) {
      return null;
    }

    return [
      TIMING_DATA => [
        OFFICE_ID => $officeId,
      ],
      PLAYER_ID => Parliament::getPrimeMinisterPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => LAW_CARD,
    ];
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    Notifications::message(clienttranslate('${player_name} uses ${tkn_lawCard}'), [
      'player' => $player,
      'tkn_lawCard' => $this->getId(),
    ]);
    $this->setUsed(1);
    $officeId = $timingData[OFFICE_ID];
    $office = Offices::get($officeId);
    $officeHolderPlayer = $office->getFamilyMember()->getPlayer();
    $office->returnFamilyMemberToSupply();
    $office->moveToVacantOffices($officeHolderPlayer);
  }
}
