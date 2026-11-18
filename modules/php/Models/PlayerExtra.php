<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\PlayersExtra;

class PlayerExtra extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'players_extra';
  protected $primary = 'player_id';
  protected $location;
  protected $state;
  protected $hasChairmanMarker;
  protected $treasury;
  protected $familyId;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['player_id', 'int'],
    'location' => ['player_location', 'str'],
    'state' => ['player_state', 'int'],
    'familyId' => ['family_id', 'str'],
    'treasury' => ['treasury', 'int'],
    'victoryPoints' => ['victory_points', 'int'],
    'opportunityMarker' => ['opportunity_marker', 'string'],
    'crownPromiseCubes' => ['crown_promise_cubes', 'int'],
    'hasChairmanMarker' => ['has_chairman_marker', 'int'],
    'trophies' => ['trophies', 'int'],
    'passedLawTokens' => ['passed_law_tokens', 'int'], // Rename to passed law tokens
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

  public function hasChairmanMarker(): bool
  {
    return $this->hasChairmanMarker === 1;
  }

  // public function getEnterprises($type = null)
  // {
  //   $enterprises = Enterprises::getAll()->toArray();
  //   $familyId = $this->getId();
  //   return Utils::filter($enterprises, function ($enterprise) use ($familyId, $type) {
  //     return $enterprise->getLocation() === $familyId && ($type === null || $enterprise->getType() === $type);
  //   });
  // }

  public function getPlayer()
  {
    return Players::get($this->id);
  }

  public function getPlayerId()
  {
    return $this->getId();
  }

  public function pay(int $amount, bool $skipNotification = true)
  {
    $this->incTreasury(-$amount);
    if (!$skipNotification) {
      Notifications::updateFamilyTreasury($this->getPlayer(), -$amount);
    }
  }

  public function payPromiseCubes(int $amount, bool $notify = true)
  {
    return $this->gainPromiseCubes(-$amount, $notify);
  }

  public function gainPromiseCubes(int $amount, bool $notify = true)
  {
    $crown = PlayersExtra::get(CROWN_PLAYER_ID);
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


  public function gainCash(int $amount, string | null $source = null, bool $skipNotification = false)
  {
    if ($amount === 0) {
      return;
    }
    $this->incTreasury($amount);
    if (!$skipNotification) {
      Notifications::updateFamilyTreasury($this->getPlayer(), $amount, $source);
    }
  }

  public function gainTrophies(int $amount)
  {
    $this->incTrophies($amount);
    Notifications::gainTrophies($this->getPlayer(), $amount);
  }

  public function loseHalfTrophiesRoundedUp()
  {
    $amount = (int) ceil($this->getTrophies() / 2);
    $this->incTrophies(-$amount);
    Notifications::loseHalfTrophiesRoundedUp($this->getPlayer(), $amount);
  }

  public function gainPassedLawToken(int $number = 1)
  {
    $this->incPassedLawTokens($number);
    Notifications::gainPassedLawTokens($this->getPlayer(), $number);
  }

  public function updateOpportunityMarker(string | null $familyActionOrRemoved)
  {
    $currentOpportunityMarker = $this->getOpportunityMarker();
    if ($familyActionOrRemoved === $currentOpportunityMarker || $currentOpportunityMarker === REMOVED) {
      return;
    }
    // Implementation for updating the opportunity marker value for this family
    $this->setOpportunityMarker($familyActionOrRemoved);
    Notifications::updateOpportunityMarker($this, $familyActionOrRemoved);
  }
}
