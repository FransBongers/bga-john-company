<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\FamilyMembers;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;

class CompanyFailureCard_05 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_05';
    $this->title = clienttranslate('Military Rebuked!');
    $this->text = [clienttranslate('Lower each player\'s score by half of the sum of their officers, Commanders, and trophies (rounding down).')];
  }

  public function resolveEffect()
  {
    foreach (Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId()) as $playerId) {
      $player = Players::get($playerId);
      $family = $player->getFamily();
      $militaryPieces = 0;

      foreach (FamilyMembers::getAllFor($family->getId()) as $familyMember) {
        $location = $familyMember->getLocation();
        if (Utils::startsWith($location, 'army_') || Utils::startsWith($location, 'Commander_')) {
          $militaryPieces++;
        }
      }

      $penalty = intdiv($militaryPieces + $family->getTrophies(), 2);
      if ($penalty === 0) {
        continue;
      }

      Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) for their officers, Commanders, and trophies'), [
        'player' => $player,
        'tkn_boldText_value' => $penalty,
      ]);
      $player->incScore(-$penalty);
    }
  }
}
