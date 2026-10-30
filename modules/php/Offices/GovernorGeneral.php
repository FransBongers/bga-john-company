<?php

namespace Bga\Games\JohnCompany\Offices;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Ships;

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

  public function create(object $ctx)
  {

    $this->replaceDirectorOfTrade();

    $this->returnGovernors();

    Notifications::frontendTrigger(GOVERNOR_GENERAL);
  }

  private function replaceDirectorOfTrade()
  {
    $directorOfTrade = Offices::get(DIRECTOR_OF_TRADE);
    $this->setTreasury($directorOfTrade->getTreasury());
    $directorOfTrade->setTreasury(0);
    $this->setFatigue($directorOfTrade->getFatigue());
    $directorOfTrade->setFatigue(0);
    $this->setLocation($directorOfTrade->getLocation());
    $directorOfTrade->setLocation(DECK);
    

    $familyMember = $directorOfTrade->getFamilyMember();
    if ($familyMember !== null) {
      $this->setFamilyMemberId($familyMember->getId());
      $familyMember->setLocation(GOVERNOR_GENERAL);
      $directorOfTrade->setFamilyMemberId(null);
    }
    Notifications::replaceDirectorOfTrade($this, $directorOfTrade, $familyMember);
  }

  private function returnGovernors()
  {
    $regions = Regions::getAll();
    $offices = Offices::getAll();

    foreach ($regions as $region) {
      if (!$region->isCompanyControlled()) {
        continue;
      }

      $governorOfficeId = $region->getGovernorOfficeId();
      $office = $offices[$governorOfficeId];
      $familyMember = $office->getFamilyMember();
      $player = null;
      if ($familyMember !== null) {
        $player = $familyMember->getPlayer();
        $office->setFatigue(0);
        $office->setFamilyMemberId(null);
        $familyMember->moveTo($player, Locations::pensioners(), [
          'skipFrom' => true
        ]);
      }

      $office->removeFromGame($player);

      $ship = Ships::getTopOf(Locations::shipUnderConstruction($region->getId()));
      if ($ship !== null) {
        $ship->returnToSupply();
      }
    }
  }

  public function increaseCompanyBalance(int $playerId)
  {

    $amount = Regions::getCompanyControlledRegionCount() * 3;
    if ($amount === 0) {
      return;
    }
    $newBalance = Company::incBalance($amount);
    Notifications::increaseCompanyBalance(Players::get($playerId), $newBalance, $amount);
  }
}
