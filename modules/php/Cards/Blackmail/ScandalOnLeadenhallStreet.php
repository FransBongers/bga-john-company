<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;

class ScandalOnLeadenhallStreet extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $affectedOffices = [
    CHAIRMAN,
    DIRECTOR_OF_TRADE,
    MANAGER_OF_SHIPPING,
    MILITARY_AFFAIRS,
    SUPERINTENDENT_OF_TRADE_IN_CHINA,
  ];


  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Scandal on Leadenhall Street');
    $this->power = 2;
    $this->text = [
      [
        'log' => clienttranslate('Play when taken from the display or anytime after the Revenue phase on a turn to force any office that is not President or Governor ${tkn_italicText_orGovGen} to vacate their office without retirement.'),
        'args' => [
          'tkn_italicText_orGovGen' => clienttranslate('(or Governor General)')
        ]
      ]
    ];
  }

  public function applyEffect(object $ctx, Player $player, array $timingData)
  {
    $ctx->insertAsBrother(Engine::buildTree([
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
      'playerId' => $player->getId(),
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Scandal on Leadenhall Street: ${you} must select an Office'),
        'description' => clienttranslate('Scandal on Leadenhall Street: ${actplayer} must select an Office'),
      ],
    ]));
  }

  private function getAffectedOffices()
  {
    $offices = Offices::getMany($this->affectedOffices)->toArray();

    return Utils::filter($offices, function ($office) {
      return $office->isInPlay() && $office->getFamilyMemberId() !== null;
    });
  }

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    if (Globals::getPhase() === SETUP) {
      return;
    }

    $ctx->insertAsBrother(new LeafNode([
      'action' => TIMING_WINDOW_CHECK,
      'args' => [
        TIMING_WINDOW => [WHEN_TAKEN_FROM_DISPLAY],
        BLACKMAIL_CARD => [$this->getId()],
      ],
    ]));
  }
}
