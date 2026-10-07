<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\Company;
use Bga\Games\JohnCompany\Managers\Offices;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class AddCash extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_ADD_CASH;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stAddCash()
  {
    $args = $this->ctx->getArgs();
    $targetType = $args['targetType'];
    $targetArg = $args['targetArg'] ?? null;
    $playerId = $args['playerId'];
    $amount = $args['amount'];
    $player = Players::get($playerId);

    if ($targetType === BALANCE) {
      $balance = Company::incBalance($amount);
      Notifications::addCashToCompanyBalance($player, $amount, $balance);
    } else if ($targetType === OFFICE) {
      $office = Offices::get($targetArg);
      $treasury = $office->incTreasury($amount);
      Notifications::addCashToOffice($player, $office, $amount, $treasury);
    }

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // .########.##....##..######...####.##....##.########
  // .##.......###...##.##....##...##..###...##.##......
  // .##.......####..##.##.........##..####..##.##......
  // .######...##.##.##.##...####..##..##.##.##.######..
  // .##.......##..####.##....##...##..##..####.##......
  // .##.......##...###.##....##...##..##...###.##......
  // .########.##....##..######...####.##....##.########

  public function getDescription(): string|array
  {
    $args = $this->ctx->getArgs();
    $targetType = $args['targetType'];
    $targetArg = $args['targetArg'] ?? null;
    $playerId = $args['playerId'];
    $amount = $args['amount'];

    if ($targetType === BALANCE) {
      return [
        'log' => clienttranslate('Add £${amount} to the Company Balance'),
        'args' => [
          'amount' => $amount,
        ],
      ];
    } else if ($targetType === OFFICE && $targetArg !== null && in_array($targetArg, [
      PRESIDENT_OF_BOMBAY,
      PRESIDENT_OF_MADRAS,
      PRESIDENT_OF_BENGAL,
    ])) {
      return [
        'log' => clienttranslate('Add £${amount} to the President\'s treasury'),
        'args' => [
          'amount' => $amount,
        ],
      ];
    }

    return clienttranslate('AddCash');
  }

  public function isDoable(Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?Player $player = null): bool
  {
    return true;
  }
}
