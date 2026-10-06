<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;

class GovernorGeneral extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = GOVERNOR_GENERAL;
    $this->title = clienttranslate('Governor General');
    $this->hirePriority = 2;
  }

  public function getCandidatesForHiring(): array
  {
    $candidates = $this->getOfficeholderCandidates([CHAIRMAN]);
    return count($candidates) > 0 ? $candidates : FamilyMembers::getWriters();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }
}
