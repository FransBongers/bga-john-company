<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Players;

class FamilyMember extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'family_members';
  protected $primary = 'family_member_id';
  protected $location;
  protected $state;
  protected $familyId;
  protected $fatigue;
  protected $presidency = null;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['family_member_id', 'str'],
    'location' => 'family_member_location',
    'state' => ['family_member_state', 'int'],
    'familyId' => ['family_id', 'str'],
    'fatigue' => ['fatigue', 'int'],
    'presidency' => ['presidency', 'str'],
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

  public function returnToSupply()
  {
    $this->setLocation(Locations::familyMemberSupply($this->familyId));
    Notifications::returnFamilyMemberToSupply(Players::getPlayerForFamily($this->familyId), $this);
  }

  public function moveTo($player, $to) {
    Notifications::moveFamilyMember($player, $this, $to);
    $this->setLocation($to);
  }
}
