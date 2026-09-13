<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

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
}
