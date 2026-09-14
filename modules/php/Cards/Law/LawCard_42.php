<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_42 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_42';
    $this->title = clienttranslate('Treasure Reform');
    $this->background = 'Law2';
    $this->policyTarget = SHARE;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate("All loot is now added to the Company Balance."),
    ];
  }
}
