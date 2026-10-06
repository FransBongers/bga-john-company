<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;

class Office extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'offices';
  protected $primary = 'office_id';
  protected $location;
  protected $state;
  protected $treasury = 0;
  protected $hirePriority;
  protected $title;
  protected $familyMemberId;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['office_id', 'str'],
    'location' => 'office_location',
    'state' => ['office_state', 'int'],
    'treasury' => ['treasury', 'int'],
    'familyMemberId' => ['family_member_id', 'str'],
  ];

  protected $staticAttributes = [
    'hirePriority',
    'title',
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function getPlayer(): Player | null
  {
    if ($this->familyMemberId === null) {
      return null;
    }

    $familyId = explode('_', $this->familyMemberId)[1];
    return Players::getPlayerForFamily($familyId);
  }

  public function getPlayerId(): int | null
  {
    $player = $this->getPlayer();
    return $player === null ? null : $player->getId();
  }

  public function getFamilyMember()
  {
    if ($this->familyMemberId === null) {
      return null;
    }
    return FamilyMembers::get($this->familyMemberId);
  }

  public function getFamilyId()
  {
    if ($this->familyMemberId === null) {
      return null;
    }

    $familyId = explode('_', $this->familyMemberId)[1];
    return $familyId;
  }

  public function getFamily()
  {
    $familyId = $this->getFamilyId();

    return $familyId === null ? null : Families::get($familyId);
  }

  public function isInPlay()
  {
    return $this->getLocation() !== DECK;
  }

  public function returnFamilyMemberToSupply()
  {
    $familyMember = FamilyMembers::get($this->familyMemberId);
    $familyMember->returnToSupply();
    $this->setFamilyMemberId(null);
    // TODO:
    // Remove any fatigue on office card
    // Move office card to supply
  }

  public function pay($player, $amount)
  {
    $this->incTreasury(-$amount);
    Notifications::payFromTreasury($player, $this, $amount, $this->getTreasury());
  }

  public function moveToVacantOffices(Player $player)
  {
    if ($this->getFamilyMemberId() !== null) {
      $this->setFamilyMemberId(null);
      // $this->returnFamilyMemberToSupply();
    }
    $this->setLocation(Locations::vacantOffices());

    Notifications::moveOfficeCard($player, $this, clienttranslate('${player_name} adds ${tkn_boldText_title} to Vacant Offices'), [
      'tkn_boldText_title' => $this->getTitle(),
      'i18n' => ['tkn_boldText_title'],
    ]);
  }


  protected function getOfficeholderCandidates(array $excludedOfficeIds = [], bool $excludeGovernors = false): array
  {
    $candidates = [];
    foreach (Offices::getAll() as $office) {
      if (in_array($office->getId(), $excludedOfficeIds, true)) {
        continue;
      }
      if ($excludeGovernors && $office instanceof \Bga\Games\JohnCompany\Offices\Governor) {
        continue;
      }

      $familyMember = $office->getFamilyMember();
      if ($familyMember !== null) {
        $candidates[] = $familyMember;
      }
    }
    return $candidates;
  }


  public function getHiringPlayerId(): int | null
  {
    throw new \Bga\GameFramework\VisibleSystemException("OFFICE_01");
  }

  public function getCandidatesForHiring()
  {
    throw new \Bga\GameFramework\VisibleSystemException("OFFICE_02");
  }
}
