<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;

class Family extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'families';
  protected $primary = 'family_id';
  protected $location;
  protected $state;
  protected $hasChairmanMarker;
  protected $treasury;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['family_id', 'str'],
    'location' => 'family_location',
    'state' => ['family_state', 'int'],
    'treasury' => ['treasury', 'int'],
    'victoryPoints' => ['victory_points', 'int'],
    'opportunityMarker' => ['opportunity_marker', 'int'],
    'crownPromiseCubes' => ['crown_promise_cubes', 'int'],
    'hasChairmanMarker' => ['has_chairman_marker', 'int'],
    'isLeaderOfOpposition' => ['is_leader_of_opposition', 'int'], // base on number of votes?
    'isPrimeMinister' => ['is_prime_minister', 'int'],
    'trophies' => ['trophies', 'int'],
    'lawPieces' => ['law_pieces', 'int'],
    'spentOnRetirement' => ['spent_on_retirement', 'int'],
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

  public function hasChairmanMarker()
  {
    return $this->hasChairmanMarker === 1;
  }

  public function getEnterprises()
  {
    $enterprises = Enterprises::getAll()->toArray();
    $familyId = $this->getId();
    return Utils::filter($enterprises, function ($enterprise) use ($familyId) {
      return $enterprise->getLocation() === $familyId;
    });
  }

  public function getPlayer()
  {
    return Players::getPlayerForFamily($this->id);
  }

  public function getShareCount()
  {
    return count(Company::getShares($this->getId()));
  }

  // TODO: include members on prizes in count
  public function canPlaceFamilyMembers()
  {
    return count(FamilyMembers::getInLocation(Locations::familyMemberSupply($this->id))) > 0;
  }

  public function pay($amount)
  {
    $this->incTreasury(-$amount);
  }

  public function payPromiseCubes($amount, $notify = true)
  {
    return $this->gainPromiseCubes(-$amount, $notify);
  }

  public function gainPromiseCubes($amount, $notify = true)
  {
    $crown = Families::get(CROWN);
    if ($amount > 0 && $crown->getCrownPromiseCubes() === 0) {
      return;
    }
    $this->incCrownPromiseCubes($amount);
    $crown->incCrownPromiseCubes(-$amount);

    if ($notify && $amount < 0) {
      Notifications::payPromiseCubes($this->getPlayer(), $amount);
    } else if ($notify && $amount > 0) {
      // Player gains Promise cubes
      Notifications::gainPromiseCubes($this->getPlayer(), $amount);
    }
    return [
      'amount' => $amount,
    ];
  }


  public function gainCash($amount)
  {
    $this->incTreasury($amount);
    Notifications::gainCash($this->getPlayer(), $amount);
  }
}
