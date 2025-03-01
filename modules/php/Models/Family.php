<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
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
    'is_prime_minister' => ['is_prime_minister', 'int'], // base on number of votes?
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

  public function getPlayer()
  {
    return Players::getPlayerForFamily($this->id);
  }

  // TODO: include members on prizes in count
  public function canPlaceFamilyMembers()
  {
    return count(FamilyMembers::getInLocation(Locations::familyMemberSupply($this->id))) > 0;
  }
}
