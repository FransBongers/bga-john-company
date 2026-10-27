<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
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

  public function hasChairmanMarker()
  {
    return $this->hasChairmanMarker === 1;
  }

  public function getEnterprises($type = null)
  {
    $enterprises = Enterprises::getAll()->toArray();
    $familyId = $this->getId();
    return Utils::filter($enterprises, function ($enterprise) use ($familyId, $type) {
      return $enterprise->getLocation() === $familyId && ($type === null || $enterprise->getType() === $type);
    });
  }

  public function getPlayer()
  {
    return Players::getPlayerForFamily($this->id);
  }

  public function getPlayerId()
  {
    return $this->getPlayer()->getId();
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

  public function pay(int $amount, $skipNotification = true)
  {
    $this->incTreasury(-$amount);
    if (!$skipNotification) {
      Notifications::updateFamilyTreasury($this->getPlayer(), -$amount);
    }
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


  public function gainCash(int $amount, string | null $source = null)
  {
    if ($amount === 0) {
      return;
    }
    $this->incTreasury($amount);
    Notifications::updateFamilyTreasury($this->getPlayer(), $amount, $source);
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

  /**
   * Total windows owned by a player's family: retired family members on
   * prizes, plus enterprises, plus prestige cards.
   */
  public function getWindowCount()
  {
    $familyId = $this->id;

    $windows = 0;

    $prizeMembers = Utils::filter(FamilyMembers::getAll()->toArray(), function ($familyMember) use ($familyId) {
      return $familyMember->getFamilyId() === $familyId && array_key_exists($familyMember->getLocation(), PRIZES);
    });
    foreach ($prizeMembers as $familyMember) {
      $windows += PRIZES[$familyMember->getLocation()][WINDOWS];
    }

    foreach ($this->getEnterprises() as $enterprise) {
      $windows += $enterprise->getWindows();
    }

    $prestigeCards = Utils::filter(LondonSeasonCards::getAll()->toArray(), function ($card) use ($familyId) {
      return $card->getLocation() === $familyId && $card->getType() === PRESTIGE;
    });
    foreach ($prestigeCards as $card) {
      $windows += $card->getWindows() ?? 0;
    }

    return $windows;
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

  public function hasPrestigeCard(string $prestigeCardId): bool
  {
    $prestigeCards = LondonSeasonCards::getInLocation(Locations::londonSeasonCards($this->getId()))->toArray();
    return Utils::array_some($prestigeCards, function ($card) use ($prestigeCardId) {
      return $card->getId() === $prestigeCardId;
    });
  }

  public function getRetirementDiscount()
  {
    $prestigeCards = LondonSeasonCards::getInLocation(Locations::londonSeasonCards($this->getId()))->toArray();
    $discount = 0;
    foreach ($prestigeCards as $card) {
      if ($card->getType() === PRESTIGE) {
        $discount += $card->getDiscount() ?? 0;
      }
    }
    return $discount;
  }
}
