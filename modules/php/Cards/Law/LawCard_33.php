<?php

namespace Bga\Games\JohnCompany\Cards\Law;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\ArmyPieces;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Ships;

class LawCard_33 extends \Bga\Games\JohnCompany\Models\LawCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'LawCard_33';
    $this->title = clienttranslate('Army Spending');
    $this->background = 'Law1';
    $this->policyConsequence = TAX;
    $this->initialSupport = -4;
    $this->text = [
      clienttranslate('Place 2 regiments in each Army.'),
    ];
    $this->extraAction = ENLIST_OFFICER;
    $this->extraActionText = [
      clienttranslate('After taking any family action(s), you may enlist an officer.'),
    ];
  }

  public function resolveImmediateEffects($ctx, $passed = true)
  {
    if (!$passed) {
      return;
    }
    $primeMinisterPlayer = Parliament::getPrimeMinisterPlayer();

    foreach (PRESIDENCIES as $presidencyId) {
      $regiments = ArmyPieces::pickForLocation(2, Locations::supplyRegiments(), Locations::armyOfReady($presidencyId));
      foreach ($regiments as $regiment) {
        $regiment->placeInArmy($primeMinisterPlayer, $presidencyId);
      }
      if (count($regiments) < 2) {
        Notifications::message(clienttranslate('No more regiments available in the supply'), []);
        break;
      }
    }
  }
}
