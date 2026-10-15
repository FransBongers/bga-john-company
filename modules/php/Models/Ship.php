<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\JoCoUtils;

class Ship extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model implements \JsonSerializable
{
  protected $id;
  protected $table = 'ships';
  protected $primary = 'ship_id';
  protected $location;
  protected $state;
  protected $side;
  protected $name;
  protected $owner = null;

  public function __construct($row)
  {
    if ($row != null) {
      parent::__construct($row);
    }
  }

  protected $attributes = [
    'id' => ['ship_id', 'str'],
    'location' => 'ship_location',
    'state' => ['ship_state', 'int'],
    'side' => ['side', 'str'],
    'type' => ['type', 'str'],
    'owner' => ['owner', 'int'],
  ];

  protected $staticAttributes = [
    'name'
  ];

  public function jsonSerialize(): array
  {
    $data = parent::jsonSerialize();
    $data['name'] = $this->getName();
    return $data;
  }

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function moveTo(Player $player, string $newLocation)
  {
    $from = $this->getLocation();
    $this->setLocation($newLocation);
    Notifications::moveShip($player, $this, $from);
  }

  public function isUnfitted()
  {
    return Utils::startsWith($this->getLocation(), SHIPYARD);
  }

  public function isOtherShip()
  {
    return $this->getType() === OTHER_SHIP;
  }

  public function isInSupply()
  {
    return Utils::startsWith($this->getLocation(), 'supply');
  }

  public function getOwner() {
    return $this->owner === null ? null : Players::get($this->owner);
  }

  public function getOwnerPlayerId() {
    return $this->owner;
  }

  public function place(Player $player, string $location, $side = null) {
    $this->setLocation($location);
    if ($side !== null) {
      $this->setSide($side);
    }
    Notifications::placeShip($player, $this);
  }

  public function isFatigued()
  {
    return $this->getType() === PLAYER_OWNED_SHIP && $this->getSide() === FATIGUED;
  }

  public function returnToSupply($player = null)
  {
    $location = $this->isOtherShip() ? Locations::supplyOtherShips() : Locations::supplyPlayerShips();
    $this->setLocation($location);
    Notifications::returnShipToSupply($this, $player);
  }

  public function flipToFatigued(Player $player)
  {
    if ($this->isOtherShip()) {
      // Should never happen
      throw new \Bga\GameFramework\VisibleSystemException("SHIP_001");
    }
    $this->setSide(FATIGUED);
    Notifications::flipShip($player, $this);
  }

  public function returnToShipyard(Player $player)
  {
    $shipyard = Enterprises::getShipyardForShip($this->getId());
    if ($shipyard === null) {
      throw new \Bga\GameFramework\VisibleSystemException("SHIP_002");
    }
    $from = $this->getLocation();
    $this->setLocation($shipyard->getId());
    Notifications::moveShip($player, $this, $from);
  }

  public function resolveStorm(Player $player)
  {
    $dieResult = JoCoUtils::rollDie();

    Notifications::message(clienttranslate('${player_name} rolls ${tkn_boldText_dieResult} for the ${tkn_boldText_shipName} ${tkn_ship}'), [
      'player' => $player,
      'tkn_boldText_dieResult' => $dieResult,
      'tkn_ship' => Notifications::tknShip($this),
      'tkn_boldText_shipName' => $this->getName(),
      'i18n' => ['tkn_boldText_shipName'],
    ]);

    if ($dieResult <= 2) {
      return;
    } else if ($dieResult <= 4 && !$this->isFatigued()) {
      $this->flipToFatigued($player);
    } else {
      $this->returnToShipyard($player);
    }
  }
}
