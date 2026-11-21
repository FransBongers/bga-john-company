<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Models\Player;

class LawCard_34 extends \Bga\Games\JohnCompany\Models\LawCard
{
  protected $timingWindows = [AFTER_OFFICE_FINISHED_ACTING];

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

  public function effectCanBeApplied(string | int | null $itemId): array | null
  {
    if (!$this->isInPlay() || $this->hasBeenUsed()) {
      return null;
    }

    $officeId = $itemId;
    if ($officeId === null || $officeId === CHAIRMAN) {
      return null;
    }

    $officeHasFamilyMember = Offices::get($officeId)->getFamilyMemberId() !== null;
    if (!$officeHasFamilyMember) {
      return null;
    }

    return [
      ITEM_ID => $officeId,
      PLAYER_ID => Parliament::getPrimeMinisterPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => LAW_CARD,
    ];
  }

  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    Notifications::message(clienttranslate('${player_name} uses ${tkn_lawCard}'), [
      'player' => $player,
      'tkn_lawCard' => $this->getId(),
    ]);
    $this->setUsed(1);
    $officeId = $itemId;
    $office = Offices::get($officeId);
    $officeHolderPlayer = $office->getFamilyMember()->getPlayer();
    $office->returnFamilyMemberToSupply();
    $office->moveToVacantOffices($officeHolderPlayer);
  }
}
