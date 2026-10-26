<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Managers\Regions;

class LawCard_53 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_53';
    $this->title = clienttranslate('Relief Demanded for Indian Famine!');
    $this->background = 'Dilemma2';
    $this->header = 'dilemma';
    $this->policyConsequence = TAX;
    $this->initialSupport = 1;
    $this->text = [
      [
        'log' => clienttranslate('${tkn_boldText_ifPassed} Enact this policy consequence a second time.'),
        'args' => [
          'tkn_boldText_ifPassed' => clienttranslate('If passed:'),
        ],
      ],
      '<br>',
      '<br>',
      [
        'log' => clienttranslate('${tkn_boldText_ifFailed} The Turmoil event occurs in each home region. Add 1 unrest to every Company-controlled region.'),
        'args' => [
          'tkn_boldText_ifFailed' => clienttranslate('If failed:'),
        ],
      ],
    ];
  }

  public function resolveImmediateEffects(object $ctx, bool $passed = true)
  {
    if ($passed) {
      $ctx->insertAsBrother(new LeafNode([
        'action' => PARLIAMENT_MEETS_RESOLVE_POLICY
      ]));
      return;
    }
    // The Turmoil event occurs in each home region. Add 1 unrest to every Company-controlled region.
    $regions = Regions::getAll();

    foreach (HOME_REGIONS as $regionId) {
      $regions[$regionId]->closeNorthernMostOpenOrder();
      Globals::setCascadedRegions([]);
    }

    foreach ($regions as $region) {
      if ($region->isCompanyControlled()) {
        $region->addUnrest(null, 1);
      }
    }
  }
}
