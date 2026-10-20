<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\Player;

class TradeInChina extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_TRADE_IN_CHINA;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTradeInChina()
  {
    return [
      'numberOfDice' => Ships::countInLocation(SUPERINTENDENT_OF_TRADE_IN_CHINA),
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

  public function actPassTradeInChina()
  {
    $playerId = $this->checkPlayer();

    Notifications::message(clienttranslate('${player_name} does not trade in China'), [
      'player' => Players::get($playerId),
    ]);

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction(PASS);
  }

  public function actTradeInChina($args)
  {
    self::checkAction('actTradeInChina');
    $playerId = $this->checkPlayer();

    $stateArgs = $this->argsTradeInChina();
    $numberOfDice = $stateArgs['numberOfDice'];

    $player = Players::get($playerId);
    $office = Offices::get(SUPERINTENDENT_OF_TRADE_IN_CHINA);
    $checkResult = JoCoUtils::makeCheck($player, $numberOfDice, $office->getFamilyMember());

    if ($checkResult === SUCCESS) {
      $numberOfExportIcons = $this->getExportIcons();
      $amount = $numberOfExportIcons * 4;
      $balance = Company::incBalance($amount);
      Notifications::addCashToCompanyBalance($player, $amount, $balance);

      $player->getFamily()->gainCash($numberOfExportIcons);
    }

    Game::get()->gamestate->setPlayerNonMultiactive($playerId, 'next');
    $this->resolveAction([], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getExportIcons(): int
  {
    $regions = Regions::getAll();
    $count = 0;
    foreach ($regions as $region) {
      if ($region->isCompanyControlled()) {
        $count += $region->getExportIcons();
      }
    }
    return $count;
  }

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    return clienttranslate('TradeInChina');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }
}
