<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_25 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_25';
    $this->title = clienttranslate('Stock Broker');
    $this->subtype = ENTERPRISE;
    $this->background = 'StockBroker';
    $this->text = [clienttranslate('When seeking shares, treat every space as if it costs £1. Other players may use this power with your permission.')];
    $this->enterpriseType = LUXURY;
  }
}
