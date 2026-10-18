<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

use Bga\Games\JohnCompany\Managers\LawCards;

class RottenBorough extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Rotten Borough');
    $this->subtype = ENTERPRISE;
    $this->background = 'RottenBorough';
    $this->enterpriseType = LUXURY;
    $this->votes = 3;
    $this->text = [
      [
        'log' => '${tkn_icon}${tkn_icon}${tkn_icon}',
        'args' => [
          'tkn_icon' => VOTE
        ],
      ]
    ];
  }

  public function getVotes(): int
  {
    return LawCards::isInPlay(MASSED_DEMAND_FRANCHISE_ID) ? 1 : 3;
  }

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['votes'] = $this->getVotes();
    return $data;
  }
}
