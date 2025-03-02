<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Engine\LeafNode;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\SetupCards;

class DraftCard extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_DRAFT_CARD;
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsDraftCard()
  {
    $players = Players::getAll();
    $cards = SetupCards::getAll()->toArray();
    $selected = $this->getSelected();

    $privateData = [];
    $numberToSelect = count($players) === 2 ? 2 : 1;

    foreach ($players as $playerId => $player) {
      $familyId = $player->getFamilyId();
      
      $cardsToSelectFrom = Utils::filter($cards, function ($card) use ($familyId) {
        return $card->getLocation() === Locations::draft($familyId);
      });

      $privateData[$playerId] = [
        'options' => $cardsToSelectFrom,
        'selected' => isset($selected[$playerId]) ? $selected[$playerId] : null,
      ];
    }

    $data = [
      '_private' => $privateData,
      'numberToSelect' => $numberToSelect,
    ];

    return $data;
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

  public function actPassDraftCard()
  {
    $player = self::getPlayer();
    // Stats::incPassActionCount($player->getId(), 1);
    // Engine::resolve(PASS);
    $this->resolveAction(PASS);
  }

  public function actDraftCard($args)
  {
    self::checkAction('actDraftCard');
    $cardIds = $args->cardIds;
        

    $player = Players::getCurrent();
    $stateArgs = $this->argsDraftCard();

    $availableCardsForPlayer = $stateArgs['_private'][$player->getId()]['options'];
    $selectedCards = [];
    foreach($cardIds as $cardId) {
      $selectedCard = Utils::array_find($availableCardsForPlayer, function ($card) use ($cardId) {
        return $cardId === $card->getId();
      });

      if ($selectedCard === null) {
        throw new \feException("ERROR_001");
      }

      $selectedCard->setLocation(Locations::setupCards($player->getFamilyId()));
      $selectedCards[] = $selectedCard;
    }

    $selected = $this->updateSelected($player, $selectedCards);

    Notifications::draftCard($player, $selectedCards);
   
    // Make the player inactive
    $game = Game::get();
    $game->gamestate->setPlayerNonMultiactive($player->getId(), 'next');
    if (count($game->gamestate->getActivePlayerList()) > 0) {
      return;
    }

    $this->ctx->insertAsBrother(new LeafNode([
      'action' => DRAFT_CARD_NEXT_STEP,
      'selected' => $selected,
    ]));

    $this->resolveAction(['cardId' => $cardId], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getSelected()
  {
    $info = $this->ctx->getInfo();

    return isset($info['selected']) ? $info['selected'] : [];
  }

  private function updateSelected($player, $selectedCards)
  {
    $selected = $this->getSelected();

    $selected[$player->getId()] = Utils::returnIds($selectedCards);

    $this->ctx->updateInfo('selected', $selected);
    Engine::save();

    return $selected;
  }
}
