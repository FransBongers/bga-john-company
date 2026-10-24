<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;
use Bga\Games\JohnCompany\Models\SetupCard;

class DraftCardNextStep extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_DRAFT_CARD_NEXT_STEP;
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

  private function playerDraft($players, $setupCards)
  {
    $turnOrder = Players::getTurnOrder();

    $newCardsPerPlayer = [];
    foreach ($players as $playerId => $player) {
      $familyId = $players[$playerId]->getFamilyId();
      $nextPlayerInTurnOrder = $this->getNextPlayerId($turnOrder, $playerId);

      $currentCards = Utils::filter($setupCards, function ($card) use ($familyId) {
        return $card->getLocation() === Locations::hand($familyId);
      });

      $newCardsPerPlayer[$nextPlayerInTurnOrder] = $currentCards;
    }

    $lastCard = count(array_values($newCardsPerPlayer)[0]) === 1;

    // Move cards
    foreach ($newCardsPerPlayer as $playerId => $cards) {
      $familyId = $players[$playerId]->getFamilyId();
      foreach ($cards as $card) {
        $card->setLocation($lastCard ? Locations::setupCards($familyId) : Locations::hand($familyId));
        // SetupCards::move($cardIds, $lastCard ? Locations::setupCards($familyId) : Locations::hand($familyId));
      }
      
    }
    Notifications::draftNewCards($newCardsPerPlayer);
  }

  private function crownDraft($players, $setupCards)
  {
    foreach ($players as $playerId => $player) {
      $familyId = $players[$playerId]->getFamilyId();
      // Move remaining cards to the crown
      $crownCards = Utils::itemsInLocation($setupCards, Locations::hand($familyId));
      SetupCards::move(Utils::returnIds($crownCards), Locations::setupCards(CROWN));
      // Draw new cards for player
      $newCards = Utils::returnIds(SetupCards::pickForLocation(3, DECK, Locations::hand($familyId))->toArray());
      // Notifications::draftNewCards($player, $newCards, false);
    }
  }

  public function stDraftCardNextStep()
  {
    // Get data
    $setupCards = SetupCards::getAll()->toArray();
    $players = Players::getAll();

    if (count($players) >= 3) {
      $this->playerDraft($players, $setupCards);
    } else {
      $this->crownDraft($players, $setupCards);
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

  private function getNextPlayerId($turnOrder, $playerId)
  {
    $index = Utils::array_find_index($turnOrder, function ($turnOrderId) use ($playerId) {
      return $turnOrderId === $playerId;
    });

    return $index === count($turnOrder) - 1 ? $turnOrder[0] : $turnOrder[$index + 1];
  }
}
