<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;

class DirectorOfTrade extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = DIRECTOR_OF_TRADE;
    $this->title = clienttranslate('Director of Trade');
    $this->hirePriority = 2;
  }

  public function getCandidatesForHiring(): array
  {
    $candidates = $this->getOfficeholderCandidates([CHAIRMAN, GOVERNOR_GENERAL], true);
    return count($candidates) > 0 ? $candidates : FamilyMembers::getWriters();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }
}
