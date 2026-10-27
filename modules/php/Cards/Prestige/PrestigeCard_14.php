<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Models\Player;


class PrestigeCard_14 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_14';
    $this->title = clienttranslate('Violet Effingham');
    $this->subtype = SPOUSE;
    $this->background = 'VioletEffingham';
    $this->text = [clienttranslate('You may no longer purchase or own shipyards. Any you currently have must be traded or discarded.')];
    $this->textNote = clienttranslate('(Fitted ships associated with discarded shipyards remain in play.)');
    $this->victoryPoints = 2;
    $this->discount = 1;
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    $family = $player->getFamily();
    $enterprises = $family->getEnterprises(SHIPYARD);

    if (count($enterprises) > 0) {
      $ctx->insertAsBrother(new LeafNode([
        'action' => TRADE_OR_DISCARD_ITEMS,
        'playerId' => 'some',
        'activePlayerIds' => [$player->getId()],
        'args' => [
          SOURCE => $this->getId(),
          'type' => SHIPYARD
        ]
      ]));
    }
  }
}
