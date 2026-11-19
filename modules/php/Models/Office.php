<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\PlayersExtra;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\TimingPreferences;

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
  protected $fatigue;
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
    'fatigue' => ['fatigue', 'int'],
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
    $playerId = $this->getPlayerId();
    if ($playerId === null) {
      return null;
    }

    return Players::get($playerId);
  }

  public function getPlayerId(): int | null
  {
    if ($this->familyMemberId === null) {
      return null;
    }

    $playerId = explode('_', $this->familyMemberId)[2];
    return (int) $playerId;
  }

  public function getFamilyMember()
  {
    if ($this->familyMemberId === null) {
      return null;
    }
    return FamilyMembers::get($this->familyMemberId);
  }

  public function getPlayerExtra()
  {
    $playerId = $this->getPlayerId();

    return $playerId === null ? null : PlayersExtra::get($playerId);
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

  public function returnToSupply()
  {
    $this->setLocation(DECK);
    TimingPreferences::removeOfficeWindows($this->getId());
    Notifications::moveOfficeCard($this, clienttranslate('${tkn_boldText_office} is returned to the supply'), [
      'tkn_boldText_office' => $this->getTitle(),
      'i18n' => ['tkn_boldText_office'],
    ]);
  }

  public function pay(Player $player, int $amount)
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

    Notifications::moveOfficeCard($this, clienttranslate('${player_name} adds ${tkn_boldText_title} to Vacant Offices'), [
      'player' => $player,
      'tkn_boldText_title' => $this->getTitle(),
      'i18n' => ['tkn_boldText_title'],
    ]);
  }

  public function removeFromGame(Player | null $player = null)
  {
    $this->setLocation(DECK);
    TimingPreferences::removeOfficeWindows($this->getId());
    $text = clienttranslate('${tkn_boldText_title} is removed from the game');
    $textArgs = [];
    if ($player === null) {
      $text = clienttranslate('${player_name} removes ${tkn_boldText_title} from the game');
      $textArgs['player'] = $player;
    }

    Notifications::moveOfficeCard($this, $text, array_merge([
      'player' => $player,
      'tkn_boldText_title' => $this->getTitle(),
      'i18n' => ['tkn_boldText_title'],
    ], $textArgs));
  }


  public function getOfficeholderCandidates(array $excludedOfficeIds = [], bool $excludeGovernors = false): array
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
