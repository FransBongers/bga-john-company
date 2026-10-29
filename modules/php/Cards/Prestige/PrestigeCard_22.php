<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_22 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_22';
    $this->title = clienttranslate('Tax Collectors');
    $this->subtype = ENTERPRISE;
    $this->background = 'TaxCollectors';
    $this->text = [
      clienttranslate("With the Prime Minister's consent, you may treat the proposed policy as if it includes an additional window tax. This must be decided before voting begins."),
      '<br><br>',
      clienttranslate("If you win a vote as the Opposition Leader, you may add an additional window tax to the policy you decide.")
    ];
    $this->enterpriseType = WORKSHOP;
  }

  public function getTaxCollectorsAction(int $playerId)
  {
    return [
      'type' => NODE_XOR,
      'children' => [
        [
          'action' => USE_TAX_COLLECTORS,
          'args' => [
            'option' => YES
          ]
        ],
        [
          'action' => USE_TAX_COLLECTORS,
          'args' => [
            'option' => NO
          ]
        ]
      ],
      'playerId' => $playerId,
      'stateDescription' => [
        'descriptionmyturn' => clienttranslate('Tax Collectors: ${you} may add an additional window tax to the proposed policy (with Prime Minister\'s consent)'),
        'description' => clienttranslate('Tax Collectors: ${actplayer} may add an additional window tax to the proposed policy (with Prime Minister\'s consent)'),
      ],
    ];
  }
}
