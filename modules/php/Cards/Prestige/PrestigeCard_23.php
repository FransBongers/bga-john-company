<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_23 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_23';
    $this->title = clienttranslate('Labour Newspaper');
    $this->subtype = ENTERPRISE;
    $this->background = 'LabourNewspaper';
    $this->enterpriseType = WORKSHOP;
    $this->text = [
      [
        'log' => '${tkn_policyIcon_manufacturing} ${tkn_policyIcon_shipping}',
        'args' => [
          'tkn_policyIcon_manufacturing' => MANUFACTURING_POLICY,
          'tkn_policyIcon_shipping' => SHIPPING_POLICY
        ],
      ],
      '<br>',
      clienttranslate('If voting on a manufacturing or shipping policy:'),
      '<br>',
      [
        'log' => '${tkn_icon}${tkn_icon}${tkn_icon}${tkn_icon}',
        'args' => [
          'tkn_icon' => VOTE
        ],
      ]
    ];
  }
}
