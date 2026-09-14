<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_41 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_41';
    $this->title = clienttranslate('Zamindar Taxes');
    $this->background = 'Law2';
    $this->policyTarget = SHARE;
    $this->initialSupport = -2;
    $this->text = [
      clienttranslate("All Governors add one die to their dice pool. Failed Administer actions place 2 unrest instead of 1."),
      '<br>',
      '<br>',
      clienttranslate("If the Governor General is in play, they earn an additional £3 as part of their bonus for a successful Govern action. Failed Govern actions place 2 unrest in each region instead of 1."),
    ];
  }
}
