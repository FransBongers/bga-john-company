<?php

namespace Bga\Games\JohnCompany\Cards\Law;

class LawCard_56 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_56';
    $this->title = clienttranslate('Deregulation');
    $this->background = 'Law3';
    $this->header = 'special';
    $this->text = [
      clienttranslate('The Company loses its trade monopoly. Players may now start a firm. Clear half (rounding down) of Company Debt and place the Standing marker on the “S” space on the track. Flip this card.'),
      '<br>',
      '<br>',
      clienttranslate('If this law fails, set it aside. The Prime Minister will remain in power and the value of Company shares is advanced.'),
    ];
  }
}
