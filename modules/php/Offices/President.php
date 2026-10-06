<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Regions;

class President extends \Bga\Games\JohnCompany\Models\Office
{
  protected string $presidencyId;
  protected string $regionId;
  protected string $seaZone;
  protected string $homePortOrderId;

  public function __construct($row)
  {
    parent::__construct($row);
  }

  public function getPresidencyId()
  {
    return $this->presidencyId;
  }

  public function getRegionId()
  {
    return $this->regionId;
  }

  public function getSeaZone()
  {
    return $this->seaZone;
  }

  public function getHomePortOrderId()
  {
    return $this->homePortOrderId;
  }

  public function getCommander()
  {
    $commander = FamilyMembers::getInLocation(Locations::commander($this->regionId))->toArray();
    if (count($commander) > 0) {
      return $commander[0];
    }
    return null;
  }

  public function getCandidatesForHiring(): array
  {
    $candidates = FamilyMembers::getWriters($this->getPresidencyId());
    foreach (Regions::getAll() as $region) {
      if ($region->getControl() !== $this->getPresidencyId()) {
        continue;
      }

      $governor = Offices::get($region->getGovernorOfficeId())->getFamilyMember();
      if ($governor !== null) {
        $candidates[] = $governor;
      }
    }
    return $candidates;
  }

  public function getHiringPlayerId(): int | null
  {

    $directorOfTrade = Offices::get(DIRECTOR_OF_TRADE);
    if ($directorOfTrade->isInPlay()) {
      return $directorOfTrade->getPlayerId();
    } else {
      return Offices::get(GOVERNOR_GENERAL)->getPlayerId();
    }
  }
}
