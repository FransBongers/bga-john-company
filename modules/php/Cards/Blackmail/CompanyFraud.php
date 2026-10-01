<?php

namespace Bga\Games\JohnCompany\Cards\Blackmail;

class CompanyFraud extends \Bga\Games\JohnCompany\Models\BlackmailCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->title = clienttranslate('Company Fraud');
    $this->text = [
      [
        'log' => clienttranslate('Play at the start of the Revenue phase. Roll one die for each of your officeholders. Lower the Company Balance equal to twice the highest roll ${tkn_italicText_minZero} and take that much from the bank.'),
        'args' => [
          'tkn_italicText_minZero' => clienttranslate('(to a minimum of zero)')
        ]
      ]
    ];
  }
}
