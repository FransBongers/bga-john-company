<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class FamilyActions
{
  public static function getFamilyActionsNode(int $playerId)
  {
    $playerExtraData = PlayersExtra::get($playerId);
    $opportunityMarker = $playerExtraData->getOpportunityMarker();

    // clienttranslate('${you} must select a family action (your opportunity marker is on ${opportunityMarker})');
    $opportunityMarkerLog = [
      'log' => in_array($opportunityMarker, [REMOVED, null]) ? clienttranslate('(your opportunity marker is ${status})') : clienttranslate('(your opportunity marker is on ${status})'),
      'args' => [
        'status' => Notifications::getOpportunityMarkerText($opportunityMarker)
      ]
    ];
    $opportunityMarker ? " (your opportunity marker is on ${opportunityMarker})" : '';

    return [
      'type' => NODE_XOR,
      'children' => [
        self::enlistWriter($playerId),
        self::enlistOfficer($playerId),
        self::purchaseEnterprise($playerId, LUXURY),
        self::purchaseEnterprise($playerId, SHIPYARD),
        self::purchaseEnterprise($playerId, WORKSHOP),
        self::seekShare($playerId),
      ],
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('${you} must select a family action ${opportunityMarkerLog}'),
        'description' => clienttranslate('${player_name} must select a family action'),
        'args' => [
          'opportunityMarkerLog' => $opportunityMarkerLog,
          'player_name' => Players::get($playerId)->getName(),
        ]
      ],
      'args' => [
        'buttonType' => SECONDARY
      ]
    ];
  }

  public static function enlistWriter(int $playerId, string $source = FAMILY_ACTION)
  {
    return [
      'action' => ENLIST_WRITER,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function enlistOfficer(int $playerId, string $source = FAMILY_ACTION)
  {
    return       [
      'action' => ENLIST_OFFICER,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function purchaseEnterprise(int $playerId, string $type, string $source = FAMILY_ACTION)
  {
    return      [
      'action' => PURCHASE_ENTERPRISE,
      'args' => [
        'type' => $type,
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function seekShare(int $playerId,  string $source = FAMILY_ACTION)
  {
    return [
      'action' => SEEK_SHARE,
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
      'args' => [
        'playerId' => $playerId,
        SOURCE => $source,
      ]
    ];
  }

  public static function getExtraActionNode(string $type, int $playerId): array
  {
    $node = null;
    switch ($type) {
      case ENLIST_WRITER:
        $node = self::enlistWriter($playerId, EXTRA_ACTION);
        break;
      case ENLIST_OFFICER:
        $node = self::enlistOfficer($playerId, EXTRA_ACTION);
        break;
      case PURCHASE_WORKSHOP:
        $node = self::purchaseEnterprise($playerId, WORKSHOP, EXTRA_ACTION);
        break;
      case PURCHASE_LUXURY:
        $node = self::purchaseEnterprise($playerId, LUXURY, EXTRA_ACTION);
        break;
      case PURCHASE_SHIPYARD:
        $node = self::purchaseEnterprise($playerId, SHIPYARD, EXTRA_ACTION);
        break;
      case SEEK_SHARE:
        $node = self::seekShare($playerId, EXTRA_ACTION);
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
      'playerId' => 'some',
      'activePlayerIds' => [$playerId],
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
