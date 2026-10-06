<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;

class SuperintendentOfTradeInChina extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = SUPERINTENDENT_OF_TRADE_IN_CHINA;
    $this->title = clienttranslate('Superintendent of Trade in China');
    $this->hirePriority = 8;
  }

  public function getCandidatesForHiring(): array
  {
    return FamilyMembers::getWriters();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }
}
