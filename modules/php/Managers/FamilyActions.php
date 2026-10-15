<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class FamilyActions
{
  public static function getFamilyActionsNode(int $playerId)
  {
    $familyId = Players::get($playerId)->getFamilyId();

    return [
      'type' => NODE_XOR,
      'children' => [
        self::enlistWriter($playerId, $familyId),
        self::enlistOfficer($playerId, $familyId),
        self::purchaseEnterprise($playerId, $familyId, LUXURY),
        self::purchaseEnterprise($playerId, $familyId, SHIPYARD),
        self::purchaseEnterprise($playerId, $familyId, WORKSHOP),
        self::seekShare($playerId, $familyId),
      ],
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('${you} must select a family action'),
        'description' => clienttranslate('${actplayer} must select a family action'),
        'args' => []
      ],
      'args' => [
        'buttonType' => SECONDARY
      ]
    ];
  }

  public static function enlistWriter(int $playerId, string $familyId, string $source = FAMILY_ACTION)
  {
    return [
      'action' => ENLIST_WRITER,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'familyId' => $familyId,
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function enlistOfficer(int $playerId, string $familyId, string $source = FAMILY_ACTION)
  {
    return       [
      'action' => ENLIST_OFFICER,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'familyId' => $familyId,
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function purchaseEnterprise(int $playerId, string $familyId, string $type, string $source = FAMILY_ACTION)
  {
    return      [
      'action' => PURCHASE_ENTERPRISE,
      'args' => [
        'familyId' => $familyId,
        'type' => $type,
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function seekShare(int $playerId, string $familyId, string $source = FAMILY_ACTION)
  {
    return [
      'action' => SEEK_SHARE,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'familyId' => $familyId,
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function getExtraActionNode(string $type, int $playerId): array
  {
    $familyId = Players::get($playerId)->getFamilyId();

    $node = null;
    switch ($type) {
      case ENLIST_WRITER:
        $node = self::enlistWriter($playerId, $familyId, EXTRA_ACTION);
        break;
      case ENLIST_OFFICER:
        $node = self::enlistOfficer($playerId, $familyId, EXTRA_ACTION);
        break;
      case PURCHASE_WORKSHOP:
        $node = self::purchaseEnterprise($playerId, $familyId, WORKSHOP, EXTRA_ACTION);
        break;
      case PURCHASE_LUXURY:
        $node = self::purchaseEnterprise($playerId, $familyId, LUXURY, EXTRA_ACTION);
        break;
      case PURCHASE_SHIPYARD:
        $node = self::purchaseEnterprise($playerId, $familyId, SHIPYARD, EXTRA_ACTION);
        break;
      case SEEK_SHARE:
        $node = self::seekShare($playerId, $familyId, EXTRA_ACTION);
        break;
      default:
        throw new \Bga\GameFramework\VisibleSystemException("FAMILY_ACTIONS_01");
    }

    return [
      'type' => NODE_XOR,
      'optional' => true,
      'children' => [
        $node,
      ],
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('${you} may perform an extra family action'),
        'description' => clienttranslate('${actplayer} may perform an extra family action'),
        'args' => []
      ],
      'args' => [
        'buttonType' => SECONDARY
      ]
    ];
  }

  public static function getExtraAction(): string | null
  {
    $lawsInPlay = array_reverse(LawCards::getInLocationOrdered(Locations::passedLaws())->toArray());

    $law = Utils::array_find($lawsInPlay, function ($law) {
      return $law->getExtraAction() !== null;
    });
    return $law !== null ? $law->getExtraAction() : null;
  }
}
