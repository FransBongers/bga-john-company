<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
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
}
