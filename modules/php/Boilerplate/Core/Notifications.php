<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;

class Notifications
{
  // .########...#######..####.##.......########.########.
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .##.....##.##.....##..##..##.......##.......##.....##
  // .########..##.....##..##..##.......######...########.
  // .##.....##.##.....##..##..##.......##.......##...##..
  // .##.....##.##.....##..##..##.......##.......##....##.
  // .########...#######..####.########.########.##.....##

  // .########..##..........###....########.########
  // .##.....##.##.........##.##......##....##......
  // .##.....##.##........##...##.....##....##......
  // .########..##.......##.....##....##....######..
  // .##........##.......#########....##....##......
  // .##........##.......##.....##....##....##......
  // .##........########.##.....##....##....########
  protected static function notifyAll($name, $msg, $data)
  {
    self::updateArgs($data);
    Game::get()->notifyAllPlayers($name, $msg, $data);
  }

  protected static function notify($player, $name, $msg, $data)
  {
    $playerId = is_int($player) ? $player : $player->getId();
    self::updateArgs($data);
    Game::get()->notifyPlayer($playerId, $name, $msg, $data);
  }

  public static function message($txt, $args = [])
  {
    self::notifyAll('message', $txt, $args);
  }

  public static function messageTo($player, $txt, $args = [])
  {
    $playerId = is_int($player) ? $player : $player->getId();
    self::notify($playerId, 'message', $txt, $args);
  }

  // TODO: check how to handle this in game log
  public static function newUndoableStep($player, $stepId)
  {
    self::notify($player, 'newUndoableStep', clienttranslate('Undo to here'), [
      'stepId' => $stepId,
      'preserve' => ['stepId'],
    ]);
  }

  public static function clearTurn($player, $notifIds)
  {
    self::notifyAll('clearTurn', clienttranslate('${player_name} restarts their turn'), [
      'player' => $player,
      'notifIds' => $notifIds,
    ]);
  }

  // public static function refreshHand($player, $hand)
  // {
  //   // foreach ($hand as &$card) {
  //   //   $card = self::filterCardDatas($card);
  //   // }
  //   self::notify($player, 'refreshHand', '', [
  //     'player' => $player,
  //     'hand' => $hand,
  //   ]);
  // }

  public static function refreshUI($data)
  {
    // Keep only the thing that matters
    $refreshedData = [
      // Add data here that needs to be refreshed

    ];
  }



  public static function log($message, $data)
  {
    self::notifyAll('log', '', [
      'message' => $message,
      'data' => $data,
    ]);
  }

  // .##.....##.########..########.....###....########.########
  // .##.....##.##.....##.##.....##...##.##......##....##......
  // .##.....##.##.....##.##.....##..##...##.....##....##......
  // .##.....##.########..##.....##.##.....##....##....######..
  // .##.....##.##........##.....##.#########....##....##......
  // .##.....##.##........##.....##.##.....##....##....##......
  // ..#######..##........########..##.....##....##....########

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  /*
   * Automatically adds some standard field about player and/or card
   */
  protected static function updateArgs(&$args)
  {
    if (isset($args['player'])) {
      $args['player_name'] = $args['player']->getName();
      $args['playerId'] = $args['player']->getId();
      unset($args['player']);
    }
  }

  protected static function tknPound()
  {
    return clienttranslate('Pounds');
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private static function getSeaName($seaId)
  {
    $idNameMap = [
      EAST_INDIAN => clienttranslate('East Indian'),
      SOUTH_INDIAN => clienttranslate('South Indian'),
      WEST_INDIAN => clienttranslate('West Indian'),
    ];
    return $idNameMap[$seaId];
  }

  // ..######......###....##.....##.########
  // .##....##....##.##...###...###.##......
  // .##.........##...##..####.####.##......
  // .##...####.##.....##.##.###.##.######..
  // .##....##..#########.##.....##.##......
  // .##....##..##.....##.##.....##.##......
  // ..######...##.....##.##.....##.########

  // .##....##..#######..########.####.########..######.
  // .###...##.##.....##....##.....##..##.......##....##
  // .####..##.##.....##....##.....##..##.......##......
  // .##.##.##.##.....##....##.....##..######....######.
  // .##..####.##.....##....##.....##..##.............##
  // .##...###.##.....##....##.....##..##.......##....##
  // .##....##..#######.....##....####.##........######.

  public static function setCrownClimate($player, $climate)
  {
    self::notifyAll('setCrownClimate', clienttranslate('${player_name} sets climate to ${tkn_climate}'), [
      'player' => $player,
      'climate' => $climate,
      'tkn_climate' => $climate,
    ]);
  }

  public static function companyOperationChairman($player, $companyDebt, $debtIncreased, $updatedTreasuries, $companyBalance)
  {
    $text = clienttranslate('${player_name} increases Company Debt to ${tkn_boldText_debtValue} and allocates funds to office treasuries');
    if ($debtIncreased && count($updatedTreasuries) === 0) {
      $text = clienttranslate('${player_name} increases Company Debt to ${tkn_boldText_debtValue}');
    } else if (!$debtIncreased && count($updatedTreasuries) > 0) {
      $text = clienttranslate('${player_name} allocates funds to office treasuries');
    }

    self::notifyAll('companyOperationChairman', $text, [
      'player' => $player,
      'tkn_boldText_debtValue' => $companyDebt,
      'companyBalance' => $companyBalance,
      'companyDebt' => $companyDebt,
      'debtIncreased' => $debtIncreased,
      'treasuries' => $updatedTreasuries,
    ]);
  }

  public static function draftCard($player, $cards)
  {
    self::notify($player, 'draftCardPrivate', clienttranslate('You draft a card'), [
      'player' => $player,
      'cardIds' => Utils::returnIds($cards),
    ]);

    self::notifyAll('draftCard', clienttranslate('${player_name} drafts a card'), [
      'player' => $player,
      'preserve' => ['playerId']
    ]);
  }

  public static function draftNewCards($player, $cardIds, $lastCard)
  {
    self::notify($player, 'draftNewCardsPrivate', '', [
      'cardIds' => $cardIds,
      'lastCard' => $lastCard,
    ]);
  }

  public static function enlistOfficer($player, $familyMember)
  {
    self::notifyAll('enlistFamilyMember', clienttranslate('${player_name} enlists ${tkn_icon}'), [
      'player' => $player,
      'tkn_icon' => OFFICER_IN_TRAINING,
      'familyMember' => $familyMember,
    ]);
  }


  public static function enlistWriter($player, $familyMember, $region)
  {
    self::notifyAll('enlistFamilyMember', clienttranslate('${player_name} enlists ${tkn_icon} in ${tkn_boldText_regionName}'), [
      'player' => $player,
      'tkn_icon' => WRITER,
      'tkn_boldText_regionName' => $region->getName(),
      'familyMember' => $familyMember,
      'i18n' => ['tkn_boldText_regionName'],
    ]);
  }

  public static function gainEnterprise($player, $enterprise)
  {
    // Notifications::message(clienttranslate('${player_name} gains a ${enterprise}'), ['player' => $player, 'enterprise' => $type]);
    self::notifyAll('gainEnterprise', clienttranslate('${player_name} gains a ${tkn_boldText_enterprise} ${tkn_enterpriseIcon}'), [
      'player' => $player,
      'tkn_boldText_enterprise' => $enterprise->getName(),
      'tkn_enterpriseIcon' => $enterprise->getType(),
      'type' => $enterprise->getType(),
      'i18n' => ['tkn_boldText_enterprise'],
    ]);
  }

  public static function nextPhase($phase)
  {
    $phaseNameMap = [
      FAMILY => clienttranslate('Family phase')
    ];
    $text = isset($phaseNameMap[$phase]) ? $phaseNameMap[$phase] : $phase;

    self::notifyAll('nextPhase', $text, [
      'phase' => $phase,
    ]);
  }

  public static function gainCash($player, $cash)
  {
    self::notifyAll('gainCash', clienttranslate('${player_name} gains ${amount} ${tkn_pound}'), [
      'player' => $player,
      'amount' => $cash,
      'tkn_pound' => clienttranslate('Pounds')
    ]);
  }

  public static function increaseCompanyDebt($player, $companyDebt, $companyBalance)
  {
    self::notifyAll('increaseCompanyDebt', clienttranslate('${player_name} increases Company Debt to ${tkn_boldText_value}'), [
      'player' => $player,
      'tkn_boldText_value' => $companyDebt,
      'companyDebt' => $companyDebt,
      'companyBalance' => $companyBalance,
      'i18n' => ['tkn_boldText_value'],
    ]);
  }

  public static function moveFamilyMembers($familyMembers)
  {
    self::notifyAll('moveFamilyMembers', clienttranslate(''), [
      'familyMembers' => $familyMembers,
    ]);
  }

  public static function newCompanyShare($player, $familyMember, $debt)
  {
    self::notifyAll('newCompanyShare', clienttranslate('${player_name} adds a family member to the ${tkn_boldText_court}'), [
      'player' => $player,
      'tkn_icon' => SHARE,
      'tkn_boldText_court' => clienttranslate('Court of Directors'),
      'familyMember' => $familyMember,
      'debt' => $debt,
      'i18n' => ['tkn_boldText_court']
    ]);
  }

  public static function placeShip($player, $ship)
  {
    // TODO: ship icon?
    self::notifyAll('placeShip', clienttranslate('${player_name} places a ship in the ${tkn_boldText_sea}'), [
      'player' => $player,
      'tkn_boldText_sea' => self::getSeaName($ship->getLocation()),
      'ship' => $ship->jsonSerialize(),
    ]);
  }

  public static function purchaseEnterprise($player, $enterprise, $amount)
  {
    self::notifyAll('purchaseEnterprise', clienttranslate('${player_name} pays ${amount} ${tkn_pound} to purchase a ${tkn_boldText_enterprise} ${tkn_enterpriseIcon}'), [
      'player' => $player,
      'tkn_boldText_enterprise' => $enterprise->getName(),
      'tkn_enterpriseIcon' => $enterprise->getType(),
      'amount' => $amount,
      'type' => $enterprise->getType(),
      'tkn_pound' => clienttranslate('Pounds'),
      'i18n' => ['tkn_boldText_enterprise'],
    ]);
  }

  public static function seekShare($player, $familyMember, $amount)
  {
    self::notifyAll('seekShare', clienttranslate('${player_name} pays ${amount} ${tkn_pound} to seek a ${tkn_icon}'), [
      'player' => $player,
      'tkn_icon' => SHARE,
      'tkn_pound' => self::tknPound(),
      'amount' => $amount,
      'familyMember' => $familyMember,
    ]);
  }


  public static function setupDone()
  {
    self::notifyAll('setupDone', '', []);
  }

  public static function setupFamilyMembers($player, $familyMembers)
  {
    self::notifyAll('setupFamilyMembers', clienttranslate('${player_name} places family members'), [
      'player' => $player,
      'familyMembers' => $familyMembers,
    ]);
  }

  public static function setupRevealCards($player, $cards)
  {
    $log = '';
    $args = [];

    foreach ($cards as $index => $card) {
      $key = 'tkn_setupCard_' . $index;
      $log = $log . '${' . $key . '}';
      $args[$key] = $card->getId();
    }

    $setupCardsLog = [
      'log' => $log,
      'args' => $args,
    ];

    self::message(clienttranslate('${player_name} reveals their setup cards ${tkn_newLine}${setupCardsLog}'), [
      'player' => $player,
      'setupCardsLog' => $setupCardsLog,
      'tkn_newLine' => '',
    ]);
  }
}
