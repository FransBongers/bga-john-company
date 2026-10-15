<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;

class FamilyMember extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'family_members';
  protected $primary = 'family_member_id';
  protected $location;
  protected $state;
  protected $familyId;
  protected $presidency = null;
  protected $type = FAMILY_MEMBER;

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
    'presidency' => ['presidency', 'str'],
  ];


  protected $staticAttributes = [
    'type',
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
    $office = $this->getOffice();
    if ($office !== null) {
      $office->setFamilyMemberId(null);
    }
    $this->setLocation(Locations::familyMemberSupply($this->familyId));
    Notifications::returnFamilyMemberToSupply(Players::getPlayerForFamily($this->familyId), $this);
  }

  public function moveTo(Player $player, string $to, array $options = [])
  {
    $skipFrom = $options['skipFrom'] ?? false;
    $text = $options['text'] ?? null;
    $textArgs = $options['textArgs'] ?? null;

    $from = $skipFrom ? null : $this->getLocation();
    $this->setLocation($to);
    Notifications::moveFamilyMember($player, $this, [
      'from' => $from,
      'text' => $text,
      'textArgs' => $textArgs,
    ]);
  }

  public function retireTo(Player $player, string $prize, int $cost)
  {
    $this->setLocation($prize);
    Notifications::retireFamilyMember($player, $this, $cost);
  }

  public function getPlayer()
  {
    return Players::getPlayerForFamily($this->familyId);
  }

  public function getPlayerId()
  {
    return $this->getPlayer()->getId();
  }

  public function getOffice()
  {
    if (in_array($this->getLocation(), OFFICES)) {
      return Offices::get($this->getLocation());
    }
    return null;
  }

  public function checkForLosses(string $source = CHECK_FOR_LOSSES)
  {
    $dieResult = JoCoUtils::rollDie();
    // $dieResult = 6;
    $player = $this->getPlayer();
    Notifications::message(clienttranslate('${tkn_boldText_source}: ${player_name} rolls ${tkn_boldText_dieResult} for ${tkn_familyMember}'), [
      'player' => $player,
      'tkn_boldText_dieResult' => $dieResult,
      'tkn_boldText_source' => $source === CHECK_FOR_LOSSES ? clienttranslate('Check for losses') : clienttranslate('Officer Rout'),
      'tkn_familyMember' => Notifications::tknFamilyMember($this),
    ]);

    if ($dieResult === 6) {
      $this->returnToSupply();
      return true;
    }
    return false;
  }

  public function getFamily()
  {
    return Families::get($this->familyId);
  }
}
