<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Models\Region;

class Governor extends \Bga\Games\JohnCompany\Models\Office
{
  protected int $dicePool;
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

  public function getDicePool(): int
  {
    return $this->dicePool;
  }

  public function getPresidencyId(): string | null
  {
    $id = Regions::get($this->regionId)->getControl();
    if (!in_array($id, PRESIDENCIES, true)) {
      return null;
    }
    return $id;
  }

  public function getRegionId(): string
  {
    return $this->regionId;
  }

  public function getRegion(): Region
  {
    return Regions::get($this->regionId);
  }
}
