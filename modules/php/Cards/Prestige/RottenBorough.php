<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class RottenBorough extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Rotten Borough');
    $this->subtype = ENTERPRISE;
    $this->background = 'RottenBorough';
    $this->enterpriseType = LUXURY;
    $this->text = [
      [
        'log' => '${tkn_icon}${tkn_icon}${tkn_icon}',
        'args' => [
          'tkn_icon' => VOTE
        ],
      ]
    ];
  }
}
