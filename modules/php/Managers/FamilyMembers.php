<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\FamilyMember;


class FamilyMembers extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'family_members';
  protected static $prefix = 'family_member_';
  protected static $customFields = [
    'family_id',
    'presidency',
    'used',
    'player_id',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    // family_id is not used?
    return self::getInstance($row['family_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $className = "\Bga\Games\JohnCompany\Families\\Family$id";
    return new FamilyMember($data);
  }


  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......


  public static function setupNewGame()
  {
    $playerExtraData = PlayersExtra::getAll();

    $familyMembers = [];

    foreach ($playerExtraData as $playerId => $playerData) {
      $familyId = $playerData->getFamilyId();
      $familyMembers[] = [
        "id" => "familyMember_" . $familyId . "_" . $playerId . "_{INDEX}",
        "nbr" => $familyId === CROWN ? 36 : 18,
        "nbrStart" => 1,
        "location" => Locations::familyMemberSupply($playerId),
        "family_id" => $familyId,
        "player_id" => $playerId
      ];
    }

    self::create($familyMembers);

    foreach ($playerExtraData as $playerId => $playerData) {
      self::shuffle(Locations::familyMemberSupply($playerId));
    }
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  public static function getAllFor(int $playerId)
  {
    $allMembers = self::getAll()->toArray();
    return Utils::filter($allMembers, function ($familyMember) use ($playerId) {
      return $familyMember->getPlayerId() === $playerId;
    });
  }

  public static function getMemberFor(int $playerId)
  {
    return self::getTopOf(Locations::familyMemberSupply($playerId));
  }

  public static function getOnStockExchange()
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'location', 'LIKE', 'StockExchange' . '%')
      ->get()
      ->toArray();
  }

  // TODO: writers on orders?
  public static function getWriters($presidencyId = null)
  {
    $allMembers = self::getAll()->toArray();
    return Utils::filter($allMembers, function ($familyMember) use ($presidencyId) {
      $location = $familyMember->getLocation();
      if ($presidencyId !== null) {
        return $location === Locations::writers($presidencyId);
      }
      return Utils::startsWith($location, 'Writers_');
    });
  }

  public static function getOfficers(string | null $presidencyId = null)
  {
    $allMembers = self::getAll()->toArray();

    $filter = $presidencyId === null ? 'army_' : 'army_' . $presidencyId . '_';
    return Utils::filter($allMembers, function ($familyMember) use ($filter) {
      return Utils::startsWith($familyMember->getLocation(), $filter);
    });
  }

  public static function getCourtOfDirectors($includeChairman = false)
  {
    $allMembers = self::getAll()->toArray();
    return Utils::filter($allMembers, function ($familyMember) use ($includeChairman) {
      $location = $familyMember->getLocation();
      if ($includeChairman && $location === CHAIRMAN) {
        return true;
      }
      return $location === COURT_OF_DIRECTORS;
    });
  }

  public static function getPlayerIdsWithShareInCourtOfDirectors(): array
  {
    $familyMembers = self::getCourtOfDirectors();
    $playerIds = [];
    foreach ($familyMembers as $familyMember) {
      $playerId = $familyMember->getPlayerId();
      if (!in_array($playerId, $playerIds)) {
        $playerIds[] = $playerId;
      }
    }
    return $playerIds;
  }
}
