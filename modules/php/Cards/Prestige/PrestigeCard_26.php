<?php

namespace Bga\Games\JohnCompany\Cards\Prestige;

class PrestigeCard_26 extends \Bga\Games\JohnCompany\Models\PrestigeCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PrestigeCard_26';
    $this->title = clienttranslate('Social Magazine');
    $this->subtype = ENTERPRISE;
    $this->background = 'SocialMagazine';
    $this->enterpriseType = LUXURY;
    $this->text = [
      [
        'log' => '${tkn_policyIcon_social} ${tkn_policyIcon_companyShares}',
        'args' => [
          'tkn_policyIcon_social' => SOCIAL_POLICY,
          'tkn_policyIcon_companyShares' => COMPANY_SHARES_POLICY
        ],
      ],
      '<br>',
      clienttranslate('If voting on a Social or Company share policy:'),
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
