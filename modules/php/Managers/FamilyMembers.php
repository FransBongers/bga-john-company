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
    'fatigue',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
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
    $families = Families::getAll();

    $familyMembers = [];

    foreach ($families as $familyId => $family) {
      $familyMembers[] = [
        "id" => "familyMember_" . $familyId . "_{INDEX}",
        "nbr" => $familyId === CROWN ? 36 : 18,
        "nbrStart" => 1,
        "location" => Locations::familyMemberSupply($familyId),
        "family_id" => $familyId
      ];
    }

    self::create($familyMembers);

    foreach ($families as $familyId => $family) {
      self::shuffle(Locations::familyMemberSupply($familyId));
    }
  }

  // ..######...########.########.########.########.########...######.
  // .##....##..##..........##.......##....##.......##.....##.##....##
  // .##........##..........##.......##....##.......##.....##.##......
  // .##...####.######......##.......##....######...########...######.
  // .##....##..##..........##.......##....##.......##...##.........##
  // .##....##..##..........##.......##....##.......##....##..##....##
  // ..######...########....##.......##....########.##.....##..######.

  public static function getAllFor($familyId)
  {
    $allMembers = self::getAll()->toArray();
    return Utils::filter($allMembers, function ($familyMember) use ($familyId) {
      return $familyMember->getFamilyId() === $familyId;
    });
  }

  public static function getMemberFor($familyId)
  {
    return self::getTopOf(Locations::familyMemberSupply($familyId));
  }

  public static function getOnStockExchange()
  {
    return self::getSelectQuery()
      ->where(static::$prefix . 'location', 'LIKE', 'StockExchange' . '%')
      ->get()
      ->toArray();
  }
}
