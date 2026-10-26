<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Managers\Enterprises;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Managers\LawCards;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Managers\Parliament;

class ParliamentMeetsCleanup extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_PARLIAMENT_MEETS_CLEANUP;
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

  public function stParliamentMeetsCleanup()
  {
    $data = Parliament::reset();

    $usedLondonSeasonCards = [];
    $usedEnterpriseCards = [];

    foreach (LondonSeasonCards::getAll() as $cardId => $card) {
      if ($card->getUsed() === 1) {
        $card->setUsed(0);
        $usedLondonSeasonCards[] = $card;
      }
    }

    foreach (Enterprises::getAll() as $cardId => $card) {
      if ($card->getUsed() === 1) {
        $card->setUsed(0);
        $usedEnterpriseCards[] = $card;
      }
    }

    if (Globals::getOldIdeasMadeNew()) {
      LawCards::moveAllInLocation(DISCARD, DECK);
      LawCards::moveAllInLocation(TEMPORARY_DISCARD, DECK);
      LawCards::shuffle(DECK);
      Globals::setOldIdeasMadeNew(false);
    }

    Globals::setSelectedOffice('');
    Notifications::parliamentMeetsCleanup($data, $usedLondonSeasonCards, $usedEnterpriseCards);

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
    return clienttranslate('ParliamentMeetsCleanup');
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
