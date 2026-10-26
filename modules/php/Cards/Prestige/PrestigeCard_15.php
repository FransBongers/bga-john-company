<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class PrestigeCard_15 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_15';
    $this->title = clienttranslate('Joseph Sedley');
    $this->subtype = SPOUSE;
    $this->background = 'JosephSedley';
    $this->text = [clienttranslate('You may no longer seek or own Company shares. If you are Chairman, move your family member back into the Court as a share and vacate the office. Any shares you have must be traded or removed.')];
    $this->victoryPoints = 2;
    $this->discount = 1;
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    // If chairman, move back into court of directors
    $chairmanFamilyMember = FamilyMembers::getTopOf(CHAIRMAN);
    if ($chairmanFamilyMember !== null && $chairmanFamilyMember->getPlayerId() === $player->getId()) {
      $chairmanFamilyMember->setLocation(COURT_OF_DIRECTORS);
      Notifications::moveFamilyMember($player, $chairmanFamilyMember);
      $office = Offices::get(CHAIRMAN);
      $office->moveToVacantOffices($player);
    }

    $companyShares = Utils::filter(FamilyMembers::getCourtOfDirectors(), fn($familyMember) => $familyMember->getPlayerId() === $player->getId());
    if (count($companyShares) > 0) {
      $ctx->insertAsBrother(new LeafNode([
        'action' => TRADE_OR_DISCARD_ITEMS,
        'playerId' => 'some',
        'activePlayerIds' => [$player->getId()],
        'args' => [
          SOURCE => $this->getId(),
          'type' => SHARE
        ]
      ]));
    }
  }
}
