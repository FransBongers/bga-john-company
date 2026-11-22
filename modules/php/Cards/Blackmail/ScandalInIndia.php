<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Models\Player;

class ScandalInIndia extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [WHEN_TAKEN_FROM_DISPLAY, START_OF_PHASE];

  public function canBePlayedAnytime(array $anytimeData): bool
  {
    return $anytimeData['afterRevenue'] ?? false;
  }

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
   * Whether the effect of this blackmail card can be applied
   * Only for effects with specific timing windows
   */
  public function effectCanBeApplied(string $timingWindow, string | int | null $itemId): array | null
  {
    if ($timingWindow === START_OF_PHASE && $itemId !== UPKEEP) {
      return null;
    }

    if (count($this->getAffectedOffices()) === 0) {
      return null;
    }

    return parent::effectCanBeApplied($timingWindow, $itemId);
  }

  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $ctx->insertBefore(Engine::buildTree([
      'type' => NODE_XOR,
      'children' => array_map(function ($office) use ($player) {
        return [
          'action' => SELECT_OFFICE_HOLDER,
          'args' => [
            'officeId' => $office->getId(),
            'actingPlayerId' => $player->getId(),
            'source' => $this->getId()
          ]
        ];
      }, $this->getAffectedOffices()),
      'playerId' => 'some',
      'activePlayerIds' => [$player->getId()],
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Scandal in India: ${you} must select an Office'),
        'description' => clienttranslate('Scandal in India: ${actplayer} must select an Office'),
      ],
    ]));
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    if (Globals::getPhase() === SETUP) {
      return;
    }

    $ctx->insertBefore(new LeafNode([
      'action' => TIMING_WINDOW_CHECK,
      'args' => [
        TIMING_WINDOW => WHEN_TAKEN_FROM_DISPLAY,
        ITEM_ID => $this->getId(),
      ],
    ]));
  }
}
