<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class ScandalInIndia extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $affectedOffices = [
    PRESIDENT_OF_BOMBAY,
    PRESIDENT_OF_MADRAS,
    PRESIDENT_OF_BENGAL,
    GOVERNOR_GENERAL,
    GOVERNOR_OF_BOMBAY,
    GOVERNOR_OF_MADRAS,
    GOVERNOR_OF_BENGAL,
    GOVERNOR_OF_PUNJAB,
    GOVERNOR_OF_DELHI,
    GOVERNOR_OF_MARATHA,
    GOVERNOR_OF_HYDERABAD,
    GOVERNOR_OF_MYSORE,
  ];

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Scandal in India');
    $this->power = 2;
    $this->text = [
      [
        'log' => clienttranslate('Play when taken from the display or anytime after the Revenue phase on a turn to force a President or Governor ${tkn_italicText_orGovGen} to vacate their office without retirement.'),
        'args' => [
          'tkn_italicText_orGovGen' => clienttranslate('(or Governor General)')
        ]
      ]
    ];
  }

  private function getAffectedOffices()
  {
    $offices = Offices::getMany($this->affectedOffices)->toArray();

    return Utils::filter($offices, function ($office) {
      return $office->isInPlay() && $office->getFamilyMemberId() !== null;
    });
  }

  /**
   * Whether the effect of this london season card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(array $timingData): array | null
  {
    // Has to be owned by a player
    if (!Utils::startsWith($this->getLocation(), 'londonSeasonCards_')) {
      return null;
    }

    if (count($this->getAffectedOffices()) === 0) {
      return null;
    }

    return [
      PLAYER_ID => $this->getActingPlayerId(),
      CARD_ID => $this->getId(),
      CARD_TYPE => BLACKMAIL_CARD,
    ];
  }

  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    // Notifications::message(clienttranslate('${player_name} plays ${tkn_londonSeasonCard}'), [
    //   'player' => $player,
    //   'tkn_londonSeasonCard' => $this->getId(),
    // ]);

    $ctx->insertAsBrother(Engine::buildTree([
      'type' => NODE_XOR,
      'children' => array_map(function ($office) use ($player) {
        return [
          'action' => VACATE_OFFICE_WITHOUT_RETIREMENT,
          'args' => [
            'officeId' => $office->getId(),
            'actingPlayerId' => $player->getId()
          ]
        ];
      }, $this->getAffectedOffices()),
      'playerId' => $player->getId(),
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Scandal in India: ${you} must select an Office'),
        'description' => clienttranslate('Scandal in India: ${actplayer} must select an Office'),
      ],
    ]));
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    $ctx->insertAsBrother(new LeafNode([
      'action' => TIMING_WINDOW_CHECK,
      'args' => [
        TIMING_WINDOW => WHEN_TAKEN_FROM_DISPLAY,
        BLACKMAIL_CARD => [$this->getId()],
      ],
    ]));
  }
}
