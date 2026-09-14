<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_39 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_39';
    $this->title = clienttranslate('Ship Subsidy');
    $this->background = 'Law1';
    $this->policyConsequence = TAX;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('Fitting player ships now costs £2 for the Manager of Shipping and for private firms.'),
    ];
    $this->extraAction = PURCHASE_SHIPYARD;
    $this->extraActionText = [
      clienttranslate('After taking any family action(s), you may buy a shipyard.'),
    ];
  }
}
