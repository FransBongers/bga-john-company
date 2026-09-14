<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Ships;

class LawCard_31 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_31';
    $this->background = 'Law1';
    $this->policyTarget = WORKSHOP;
    $this->initialSupport = 1;
    $this->title = clienttranslate('Calico Acts');
    $this->text = [
      clienttranslate('When passed, players gain £2 for each manufacturing enterprise they own.'),
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('At the start of the Revenue phase, lower the Company Balance by £1 for every £7. ${tkn_boldText_skipAfterDeregulation}'),
        'args' => [
          'tkn_boldText_skipAfterDeregulation' => clienttranslate('Skip this penalty after deregulation.'),
        ],
      ]
    ];
    $this->extraAction = PURCHASE_WORKSHOP;
    $this->extraActionText = [
      clienttranslate('After taking any family action(s), you may buy a workshop.'),
    ];
  }
}
