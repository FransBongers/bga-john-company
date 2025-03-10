<?php

namespace Bga\Games\JohnCompany\Models;

use Bga\Games\JohnCompany\Boilerplate\Core\Preferences;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\SetupCards;

/*
 * Player: all utility functions concerning a player
 */

class Player extends \Bga\Games\JohnCompany\Boilerplate\Helpers\DB_Model
{
  protected $id;

  protected $table = 'player';
  protected $primary = 'player_id';
  protected $attributes = [
    'id' => ['player_id', 'int'],
    'no' => ['player_no', 'int'],
    'avatar' => 'player_avatar',
    'name' => 'player_name',
    'color' => 'player_color',
    'eliminated' => 'player_eliminated',
    'score' => ['player_score', 'int'],
    'scoreAux' => ['player_score_aux', 'int'],
    'zombie' => 'player_zombie',
  ];

  /*
   * Getters
   */
  public function getPref($prefId)
  {
    return Preferences::get($this->id, $prefId);
  }

  public function jsonSerialize($currentPlayerId = null): array
  {
    $data = parent::jsonSerialize();
    $isCurrentPlayer = intval($currentPlayerId) == $this->getId();

    return array_merge(
      $data,
      [
        'draft' => $isCurrentPlayer ? $this->getDraft() : [],
        'familyId' => $this->getFamilyId(),
        'setupCards' => $isCurrentPlayer ? $this->getSetupCards() : [],
      ],
    );
  }

  public function getId()
  {
    return (int) parent::getId();
  }

  public function getFamily()
  {
    return Families::get($this->getFamilyId());
  }

  public function getFamilyId()
  {
    if ($this->getId() === CROWN_PLAYER_ID) {
      return CROWN;
    } else {
      return COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[$this->getColor()]];
    }
  }

  public function getDraft()
  {
    return SetupCards::getInLocation(Locations::draft($this->getFamilyId()))->toArray();
  }

  public function getSetupCards()
  {
    return SetupCards::getInLocation(Locations::setupCards($this->getFamilyId()))->toArray();
  }
}
