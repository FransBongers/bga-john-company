<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class ScandalInIndia extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
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
}
