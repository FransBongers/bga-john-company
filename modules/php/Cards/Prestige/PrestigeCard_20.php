<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_20 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_20';
    $this->title = clienttranslate('Lady Newcome');
    $this->subtype = SPOUSE;
    $this->background = 'LadyNewcome';
    $this->text = [clienttranslate('Act as if your enterprises no longer have vote icons. Remove your “Vote with my Enterprises” promise from the game, even if it is owned by another player. Any enterprises you transfer to another player cannot be used to vote with that turn.')];
    $this->victoryPoints = 3;
    $this->discount = 2;
  }
}
