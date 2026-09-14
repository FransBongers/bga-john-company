<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_35 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_35';
    $this->title = clienttranslate('Debt Restructure');
    $this->background = 'Law1';
    $this->policyConsequence = TAX;
    $this->initialSupport = -3;
    $this->text = [
      clienttranslate('Lower the Company Debt marker to the leftmost space.'),
    ];
    $this->extraAction = SEEK_SHARE;
    $this->extraActionText = [
      clienttranslate('After taking any family action(s), you may seek a share.'),
    ];
  }
}
