<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Models\Player;

class PrestigeCard_13 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_13';
    $this->title = clienttranslate('John Thorpe');
    $this->subtype = SPOUSE;
    $this->background = 'JohnThorpe';
    $this->text = [clienttranslate('You may no longer purchase or own workshops. Any you currently have must be traded or discarded.')];
    $this->victoryPoints = 2;
    $this->discount = 2;
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    $family = $player->getFamily();
    $enterprises = $family->getEnterprises(WORKSHOP);

    if (count($enterprises) > 0) {
      $ctx->insertAsBrother(new LeafNode([
        'action' => TRADE_OR_DISCARD_ITEMS,
        'playerId' => 'some',
        'activePlayerIds' => [$player->getId()],
        'args' => [
          SOURCE => $this->getId(),
          'type' => WORKSHOP
        ]
      ]));
    }
  }
}
