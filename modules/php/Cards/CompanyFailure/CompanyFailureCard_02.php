<?php

namespace Bga\Games\JohnCompany\Cards\CompanyFailure;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;

class CompanyFailureCard_02 extends \Bga\Games\JohnCompany\Models\CompanyFailureCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'CompanyFailureCard_02';
    $this->title = clienttranslate('Careless Shipbuilders indicted!');
    $this->text = [clienttranslate('Lower each player\'s score by 1VP for each of their shipyards.')];
  }

  public function resolveEffect()
  {
    foreach (Players::getTurnOrder(Parliament::getPrimeMinisterPlayerId()) as $playerId) {
      $player = Players::get($playerId);

      $count = 0;
      foreach ($player->getFamily()->getEnterprises() as $enterprise) {
        if ($enterprise->getType() === SHIPYARD) {
          $count++;
        }
      }
      foreach ($player->getLondonSeasonCards() as $card) {
        if ($card->getEnterpriseType() === SHIPYARD) {
          $count++;
        }
      }

      if ($count === 0) {
        continue;
      }

      Notifications::message(clienttranslate('${player_name} loses ${tkn_boldText_value} victory point(s) for their ${tkn_boldText_shipyards} ${tkn_icon}'), [
        'player' => $player,
        'tkn_boldText_value' => $count,
        'tkn_icon' => SHIPYARD,
        'tkn_boldText_shipyards' => clienttranslate('Shipyards'),
        'i18n' => ['tkn_boldText_shipyards']
      ]);
      $player->incScore(-$count);
    }
  }
}
