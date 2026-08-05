<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Crown;
use Bga\Games\JohnCompany\Managers\Families;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\SetupCard;

class CrownChairmanRequestAllocation extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_CROWN_CHAIRMAN_REQUEST_ALLOCATION;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.


  public function argsCrownChairmanRequestAllocation()
  {


    return [
      'maxAmount' => min(3, Company::getBalance()),
    ];
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actPassCrownChairmanRequestAllocation()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actCrownChairmanRequestAllocation($args)
  {
    self::checkAction('actCrownChairmanRequestAllocation');
    $playerId = $this->checkPlayer();

    $continue = property_exists($args, 'continue') ? $args->continue : false;
    $officeId = property_exists($args, 'officeId') ? $args->officeId : null;
    $amount = property_exists($args, 'amount') ? $args->amount : null;

    $stateArgs = $this->argsCrownChairmanRequestAllocation();

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');

    if ($continue) {
      $this->resolveAction([], true);
      return;
    }

    if ($officeId === null || $amount === null) {
      throw new \feException("ERROR_045");
    }

    if ($amount > $stateArgs['maxAmount']) {
      throw new \feException("ERROR_046");
    }

    $player = Players::get($playerId);

    $office = Offices::get($officeId);

    Notifications::message(clienttranslate('${player_name} requests to allocate ${amount} ${tkn_pound} to ${tkn_boldText_office}'), [
      'player' => $player,
      'amount' => $amount,
      'tkn_pound' => Notifications::tknPound(),
      'tkn_boldText_office' => $office->getTitle(),
    ]);

    $player->getFamily()->payPromiseCubes(1);

    $crownPlayer = Crown::getPlayer();
    

    $balance = Company::incBalance(-$amount);
    $treasury = $office->incTreasury($amount);

    Notifications::allocateBalanceToOffice($crownPlayer, $office, $amount, $balance, $treasury);

    $this->resolveAction([], true);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
