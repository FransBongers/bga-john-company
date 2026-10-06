<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;

class MilitaryAffairs extends \Bga\Games\JohnCompany\Models\Office
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = MILITARY_AFFAIRS;
    $this->title = clienttranslate('Military Affairs');
    $this->hirePriority = 4;
  }

  public function getCandidatesForHiring(): array
  {
    $commanders = [];
    foreach (PRESIDENCIES as $presidencyId) {
      $homeRegionId = PRESIDENCY_HOME_REGION_MAP[$presidencyId];
      $commanders = array_merge(
        $commanders,
        FamilyMembers::getInLocation(Locations::commander($homeRegionId))->toArray()
      );
    }
    if (count($commanders) > 0) {
      return $commanders;
    }

    $officers = [];
    foreach (PRESIDENCIES as $presidencyId) {
      $officers = array_merge(
        $officers,
        FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId))->toArray(),
      );
    }
    if (count($officers) > 0) {
      return $officers;
    }

    return FamilyMembers::getInLocation(Locations::officerInTraining())->toArray();
  }

  public function getHiringPlayerId(): int | null
  {
    return Offices::get(CHAIRMAN)->getPlayerId();
  }
}
