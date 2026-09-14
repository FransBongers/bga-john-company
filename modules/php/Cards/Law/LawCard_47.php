<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_47 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_47';
    $this->title = clienttranslate('Military Oversight');
    $this->background = 'Law2';
    $this->policyTarget = SHARE;
    $this->initialSupport = 5;
    $this->text = [
      clienttranslate('Immediately after Military Affairs acts, the Prime Minister may demote one Commander to an officer and then appoint a Commander from officers in that army following the rules for hiring and Nepotism.'),
    ];
  }
}
