<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Regions;

class Governor extends \Bga\Games\JohnCompany\Models\Office
{
  protected string $regionId;

  public function __construct($row)
  {
    parent::__construct($row);
  }

  public function getCandidatesForHiring(): array
  {
    $region = Regions::get($this->regionId);

    $presidencyId = $region->getControl();
    if (!in_array($presidencyId, PRESIDENCIES, true)) {
      throw new \Bga\GameFramework\VisibleSystemException("GOVERNOR_01");
    }

    return array_merge(
      FamilyMembers::getWriters($presidencyId),
      FamilyMembers::getInLocation(Locations::armyOfReady($presidencyId))->toArray(),
    );
  }

  public function getHiringPlayerId(): int | null
  {
    $presidencyId = Regions::get($this->regionId)->getControl();
    return Offices::get(PRESIDENCY_PRESIDENT_OFFICE_MAP[$presidencyId])->getPlayerId();
  }
}
