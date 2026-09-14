<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_40 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_40';
    $this->title = clienttranslate('Trade Regulations');
    $this->background = 'Law2';
    $this->policyTarget = SHIPYARD;
    $this->initialSupport = -1;
    $this->text = [
      clienttranslate("Each President's bonus is added to the Company Balance."),
    ];
  }
}
