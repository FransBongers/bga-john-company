<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_21 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_21';
    $this->title = clienttranslate('Shipbuilders');
    $this->subtype = ENTERPRISE;
    $this->background = 'Shipbuilders';
    $this->text = [clienttranslate('Whenever the Manager of Shipping buys an extra ship or Company ship, take £1 from the bank for each.')];
    $this->enterpriseType = SHIPYARD;
  }
}
