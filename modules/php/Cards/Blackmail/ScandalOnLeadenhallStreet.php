<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Models\Player;

class ScandalOnLeadenhallStreet extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
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

  protected function resolveImmediateEffect(Player $player, object $ctx)
  {
    if (Globals::getPhase() === SETUP) {
      return;
    }

    $ctx->insertAsBrother(new LeafNode([
      'action' => TIMING_WINDOW_CHECK,
      'args' => [
        TIMING_WINDOW => WHEN_TAKEN_FROM_DISPLAY,
        BLACKMAIL_CARD => [$this->getId()],
      ],
    ]));
  }
}
