<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;

class CompanyFailureCard_06 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_06';
    $this->title = clienttranslate('The British Despots of India!');
    $this->text = [clienttranslate('Lower each player\'s score by 2VP for each of their Governors or by 4VP for the Governor General. Anyone who had a Governor that was removed in Region Loss on the final turn should lower their score by 2VP for each.')];
  }

  public function resolveEffect()
  {
    $removedGovernors = Globals::getRemovedGovernors();
    $offices = Offices::getAll()->toArray();
    $governorOffices = [
      GOVERNOR_OF_BOMBAY,
      GOVERNOR_OF_MADRAS,
      GOVERNOR_OF_BENGAL,
      GOVERNOR_OF_PUNJAB,
      GOVERNOR_OF_DELHI,
      GOVERNOR_OF_MARATHA,
      GOVERNOR_OF_HYDERABAD,
      GOVERNOR_OF_MYSORE,
    ];

    foreach (Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId()) as $playerId) {
      $player = Players::get($playerId);
      $penalty = 0;
      $familyId = $player->getFamilyId();

      foreach ($offices as $office) {
        $officeId = $office->getId();
        if ($office->getPlayerId() !== $playerId) {
          continue;
        }
        if ($officeId === GOVERNOR_GENERAL) {
          $penalty += 4;
        } else if (in_array($officeId, $governorOffices)) {
          $penalty += 2;
        }
      }

      foreach ($removedGovernors as $familyMemberId) {
        if (explode('_', $familyMemberId)[1] === $familyId) {
          $penalty += 2;
        }
      }

      if ($penalty === 0) {
        continue;
      }

      Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) for their Governors'), [
        'player' => $player,
        'tkn_boldText_value' => $penalty,
      ]);
      $player->incScore(-$penalty);
    }
  }
}
