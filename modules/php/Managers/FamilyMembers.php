<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Models\FamilyMember;

/**
 * Cards
 */
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
        "nbr" => 18,
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

  public static function getMemberFor($familyId)
  {
    return self::getTopOf(Locations::familyMemberSupply($familyId));
  }
}
