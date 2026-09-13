<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_18 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_18';
    $this->title = clienttranslate('Lady Glencora');
    $this->subtype = SPOUSE;
    $this->background = 'LadyGlencora';
    $this->text = [clienttranslate('Remove your opportunity marker from the game. It is never placed when you take an action.')];
    $this->textNote = clienttranslate('Note: you may still gain extra actions from laws and an extra writer when there are + vacancies.');
    $this->victoryPoints = 2;
    $this->discount = 2;
  }
}
