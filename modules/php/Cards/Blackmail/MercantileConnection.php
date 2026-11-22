<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class MercantileConnection extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  protected $timingWindows = [AFTER_PRESIDENT_OR_FIRM_CHECK];

  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Mercantile Connection');
    $this->power = 1;
    $this->text = [
      clienttranslate('Play after a check to force a President or firm to reroll any Trade roll with half as many dice, rounding down.'),
      '<br>',
      [
        'log' => '${tkn_italicText}',
        'args' => [
          'tkn_italicText' => clienttranslate('If reduced to zero dice, treat roll as failure.')
        ]
      ]
    ];
  }


  /**
   * Apply the effect of this london season card
   * Only for effects with specific timing windows
   */
  public function applyEffect(object $ctx, Player $player, string | int | null $itemId)
  {
    $this->forceRerollOfLatestCheck();
  }
}
