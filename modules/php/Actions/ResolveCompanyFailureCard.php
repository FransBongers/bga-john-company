<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\CompanyFailureCards;

class ResolveCompanyFailureCard extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_RESOLVE_COMPANY_FAILURE_CARD;
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

  public function stResolveCompanyFailureCard()
  {
    Notifications::nextPhase(clienttranslate('Consequence of Failure'));
    $card = CompanyFailureCards::getTopOf(DECK);
    $card->setLocation(DRAWN_COMPANY_FAILURE_CARD);

    Notifications::drawCompanyFailureCard($card);

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
    return clienttranslate('ResolveCompanyFailureCard');
  }

  public function isDoable(\Bga\Games\JohnCompany\Models\Player $player): bool
  {
    return true;
  }

  public function isAutomatic(?\Bga\Games\JohnCompany\Models\Player $player = null): bool
  {
    return true;
  }
}
