<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_34 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_34';
    $this->title = clienttranslate('Board of Control');
    $this->background = 'Law2';
    $this->policyConsequence = POWER;
    $this->initialSupport = 0;
    $this->text = [
      clienttranslate('Once per turn, after any office except the Chairman has finished acting, the Prime Minister may remove its officeholder. The piece is returned to its supply and the office card is added to the Vacant Offices box.'),
    ];
  }
}
