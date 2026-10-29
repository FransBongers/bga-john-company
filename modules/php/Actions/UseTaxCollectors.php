<?php

namespace Bga\Games\JohnCompany\Actions;

use Bga\Games\JohnCompany\Boilerplate\Core\Engine;
use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Managers\LondonSeasonCards;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Models\Player;

class UseTaxCollectors extends \Bga\Games\JohnCompany\Models\AtomicAction
{
  public function getState()
  {
    return ST_USE_TAX_COLLECTORS;
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

  public function stUseTaxCollectors()
  {
    $args = $this->ctx->getArgs();
    $option = $args['option'];
    $consent = $args['consent'] ?? false;

    $ownerFamily = LondonSeasonCards::getOwnerFamily(TAX_COLLECTORS_ID);
    $owningPlayerId = $ownerFamily->getPlayerId();
    $owningPlayer = Players::get($owningPlayerId);
    $primeMinisterPlayer = Parliament::getPrimeMinisterPlayer();

    $sourceTitle = LondonSeasonCards::get(TAX_COLLECTORS_ID)->getTitle();

    if ($option === YES && !$consent) {
      $this->askForConsentAdditionalWindowTax($primeMinisterPlayer, $owningPlayer, $sourceTitle);
    } else if ($option === YES && $consent) {
      Notifications::message(clienttranslate('${tkn_boldText_source}: ${player_name} gives consent to add an additional window tax to the proposed policy'), [
        'player' => $primeMinisterPlayer,
        'tkn_boldText_source' => $sourceTitle,
      ]);
      Globals::setAdditionalWindowTax(true);
    } else if ($option === NO) {
      $text = $consent ? clienttranslate('${tkn_boldText_source}: ${player_name} does not give consent to add an additional window tax to the proposed policy') : clienttranslate('${tkn_boldText_source}: ${player_name} does not want to add an additional window tax to the proposed policy');
      Notifications::message($text, [
        'player' => $consent ? $primeMinisterPlayer : $owningPlayer,
        'tkn_boldText_source' => $sourceTitle,
      ]);
      Globals::setAdditionalWindowTax(false);
    }

    $this->resolveAction(['automatic' => true], true);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...



  private function askForConsentAdditionalWindowTax(Player $primeMinisterPlayer, Player $owningPlayer, string $sourceTitle)
  {
    $primeMinisterOwnsTaxCollectors = $primeMinisterPlayer->getId() === $owningPlayer->getId();
    // No need for consent because the Prime Minister owns the Tax Collectors card
    if ($primeMinisterOwnsTaxCollectors) {
      Notifications::message(clienttranslate('${tkn_boldText_source}: ${player_name} adds an additional window tax to the proposed policy'), [
        'player' => $owningPlayer,
        'tkn_boldText_source' => $sourceTitle,
      ]);
      Globals::setAdditionalWindowTax(true);
      return;
    }

    // Prime Minister needs to give consent
    Notifications::message(clienttranslate('${tkn_boldText_source}: ${player_name} wants to add an additional window tax to the proposed policy'), [
      'player' => $owningPlayer,
      'tkn_boldText_source' => $sourceTitle,
    ]);
    $this->ctx->insertAsBrother(Engine::buildTree(
      [
        'type' => NODE_XOR,
        'children' => [
          [
            'action' => USE_TAX_COLLECTORS,
            'args' => [
              'option' => YES,
              'consent' => true
            ]
          ],
          [
            'action' => USE_TAX_COLLECTORS,
            'args' => [
              'option' => NO,
              'consent' => true
            ]
          ]
        ],
        'playerId' => $primeMinisterPlayer->getId(),
        'stateDescription' => [
          'descriptionmyturn' => clienttranslate('Tax Collectors: ${you} must give consent to add an additional window tax to the proposed policy'),
          'description' => clienttranslate('Tax Collectors: ${actplayer} must give consent to add an additional window tax to the proposed policy'),
        ],
      ]
    ));
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
    $args = $this->ctx->getArgs();
    $option = $args['option'];
    $consent = $args['consent'] ?? false;
    if ($option === YES && !$consent) {
      return clienttranslate('Propose additional window tax');
    } else if ($option === YES && $consent) {
      return clienttranslate('Give consent for additional window tax');
    } else if ($option === NO && !$consent) {
      return clienttranslate('Do not propose additional window tax');
    } else if ($option === NO && $consent) {
      return clienttranslate('Do not give consent for additional window tax');
    }
    return '';
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
