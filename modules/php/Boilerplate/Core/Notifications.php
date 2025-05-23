<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core;

use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Regions;

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

  public static function tknPound()
  {
    return clienttranslate('Pounds');
  }

  public static function tknPromiseCube()
  {
    return clienttranslate('Promise Cubes');
  }

  public static function tknRegiment()
  {
    return clienttranslate('Regiment');
  }


  protected static function tknFamilyMember($familyMember)
  {
    $number = intval(explode('_', $familyMember->getId())[2]) % 18;

    return implode(':', [$familyMember->getFamilyId(), $number]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private static function getRegionNameForArmy($armyId)
  {
    $idNameMap = [
      BENGAL_ARMY => clienttranslate('Bengal'),
      BOMBAY_ARMY => clienttranslate('Bombay'),
      MADRAS_ARMY => clienttranslate('Madras'),
    ];
    return $idNameMap[$armyId];
  }

  private static function getSeaName($seaId)
  {
    $idNameMap = [
      EAST_INDIAN => clienttranslate('East Indian'),
      SOUTH_INDIAN => clienttranslate('South Indian'),
      WEST_INDIAN => clienttranslate('West Indian'),
    ];
    return $idNameMap[$seaId];
  }

  private static function getRegionNameForWriter($location)
  {
    $regionId = null;

    if (Utils::startsWith($location, 'Writers')) {
      $regionId = explode('_', $location)[1];
    }

    $idNameMap = [
      BENGAL => clienttranslate('Bengal'),
      BOMBAY => clienttranslate('Bombay'),
      DELHI => clienttranslate('Delhi'),
      HYDERABAD => clienttranslate('Hyderabad'),
      MADRAS => clienttranslate('Madras'),
      MARATHA => clienttranslate('Maratha'),
      MYSORE => clienttranslate('Mysore'),
      PUNJAB => clienttranslate('Punjab'),
    ];
    return isset($idNameMap[$regionId]) ? $idNameMap[$regionId] : 'Unmapped region';
  }

  private static function getLocationNameForFamilyMember($location)
  {
    $locationNameMap = [
      BENGAL_WRITERS  => clienttranslate('Bengal'),
      BOMBAY_WRITERS => clienttranslate('Bombay'),
      MADRAS_WRITERS => clienttranslate('Madras'),
      BENGAL_ARMY => clienttranslate('army of Bengal'),
      BOMBAY_ARMY => clienttranslate('army of Bombay'),
      MADRAS_ARMY => clienttranslate('army of Madras'),
      OFFICER_IN_TRAINING => clienttranslate('officers-in-training')
    ];
    if (!isset($locationNameMap[$location])) {
      throw new \feException("ERROR_021");
    }
    return $locationNameMap[$location];
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

  public static function changePrimeMinister($player, $familyId)
  {
    self::notifyAll('changePrimeMinister', clienttranslate('${player_name} becomes ${tkn_boldText_primeMinister}'), [
      'player' => $player,
      'tkn_boldText_primeMinister' => clienttranslate('Prime Minister'),
      'familyId' => $familyId,
      'i18n' => ['tkn_boldText_primeMinister'],
    ]);
  }

  public static function changeOrderStatus($player, $order, $status)
  {
    $text = $status === OPEN ? clienttranslate('${player_name} opens an order in ${tkn_boldText_region}') : clienttranslate('${player_name} closes an order in ${tkn_boldText_region}');

    self::notifyAll('changeOrderStatus', $text, [
      'player' => $player,
      'tkn_boldText_region' => Regions::get($order->getLocation())->getName(),
      'order' => $order->jsonSerialize(),
      'i18n' => ['tkn_boldText_region'],
    ]);
  }

  public static function changeOrderStatusByGame($order, $status)
  {
    $text = $status === OPEN ? clienttranslate('An order in ${tkn_boldText_region} is opened') : clienttranslate('An order in ${tkn_boldText_region} is closed');

    self::notifyAll('changeOrderStatus', $text, [
      'tkn_boldText_region' => Regions::get($order->getLocation())->getName(),
      'order' => $order->jsonSerialize(),
      'i18n' => ['tkn_boldText_region'],
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

  public static function crisis($attackerName, $defenderName, $isInvasion)
  {
    $text = $isInvasion ?
      clienttranslate('${tkn_boldText_attacker} invades ${tkn_boldText_defender}') :
      clienttranslate('${tkn_boldText_attacker} rebels against ${tkn_boldText_defender}');

    Notifications::message($text, [
      'tkn_boldText_attacker' => $attackerName,
      'tkn_boldText_defender' => $defenderName,
      'i18n' => ['tkn_boldText_attacker', 'tkn_boldText_defender'],
    ]);
  }

  public static function crisisResult($attackStrength, $defenderStrength)
  {
    $text = $attackStrength > $defenderStrength ?
      clienttranslate('The attack succeeds with a total of ${tkn_boldText_attackerTotal} vs ${tkn_boldText_defenderTotal}') :
      clienttranslate('The attack fails with a total of ${tkn_boldText_attackerTotal} vs ${tkn_boldText_defenderTotal}');

    Notifications::message($text, [
      'tkn_boldText_attackerTotal' => $attackStrength,
      'tkn_boldText_defenderTotal' => $defenderStrength,
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

  public static function elephantMarch($elephant)
  {
    $location = $elephant[LOCATION];
    $text = clienttranslate('The ${tkn_elephant} marches');
    $args = [
      'tkn_elephant' => 'Elephant',
      LOCATION => $elephant[LOCATION],
      FACING => $elephant[FACING],
    ];

    $regions = Regions::getAll();

    if (in_array($location, REGIONS)) {
      $text = clienttranslate('The ${tkn_elephant} marches to {tkn_boldText_region}');
      $args['tkn_boldText_region'] = $regions[$location]->getName();
      $args['i18n'] = ['tkn_boldText_region'];
    } else {
      $text = clienttranslate('The ${tkn_elephant} marches to the border between ${tkn_boldText_region1} and ${tkn_boldText_region2} and points towards ${tkn_boldText_region3}');
      $args['tkn_boldText_region1'] = $regions[BORDERS_CONNECTED_REGIONS_MAP[$location][0]]->getName();
      $args['tkn_boldText_region2'] = $regions[BORDERS_CONNECTED_REGIONS_MAP[$location][1]]->getName();
      $args['tkn_boldText_region3'] = $regions[$elephant[FACING]]->getName();
      $args['i18n'] = ['tkn_boldText_region1', 'tkn_boldText_region2', 'tkn_boldText_region3'];
    }

    self::notifyAll('elephantMarch', $text, $args);
  }

  public static function emergencyLoans($companyDebt, $numberOfEmergencyLoans, $remainingExpenses)
  {
    self::notifyAll('moveCompanyDebt', clienttranslate('The Company must take ${number} emergency loan(s) to cover remaining ${tkn_boldText_amount} ${tkn_pound} of expenses'), [
      'tkn_boldText_amount' => $remainingExpenses,
      'tkn_pound' => self::tknPound(),
      'number' => $numberOfEmergencyLoans,
      'companyDebt' => $companyDebt,
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

  public static function fillOrder($player, $order, $filledByWriter, $familyMember = null, $from = null)
  {
    $text = $filledByWriter ?
      clienttranslate('${player_name} places ${tkn_familyMember} on an order with value of ${amount} ${tkn_pound} in ${tkn_boldText_regionName}') :
      clienttranslate('${player_name} places a filled order token on an order with value of ${amount} ${tkn_pound} in ${tkn_boldText_regionName}');

    $args = [
      'player' => $player,
      'amount' => $order->getValue(),
      'from' => $from,
      'tkn_boldText_regionName' => $order->getRegion()->getName(),
      'tkn_pound' => self::tknPound(),
      'order' => $order->jsonSerialize(),
      'familyMember' => $familyMember,
      'i18n' => ['tkn_boldText_regionName'],
    ];
    if ($filledByWriter) {
      $args['tkn_familyMember'] = self::tknFamilyMember($familyMember);
    }

    self::notifyAll('fillOrder', $text, $args);
  }

  public static function foreignInvasion($regionName, $strength)
  {
    $text = clienttranslate('Foreign Invasion in ${tkn_boldText_defender} with a strength of ${tkn_boldText_strength}');

    Notifications::message($text, [
      'tkn_boldText_defender' => $regionName,
      'tkn_boldText_strength' => $strength,
      'i18n' => ['tkn_boldText_defender'],
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
      FAMILY => clienttranslate('Family phase'),
      HIRING => clienttranslate('Hiring'),
      CHAIRMAN => clienttranslate('Chairman'),
      DIRECTOR_OF_TRADE => clienttranslate('Director of Trade'),
      MANAGER_OF_SHIPPING => clienttranslate('Manager of Shipping'),
      MILITARY_AFFAIRS => clienttranslate('Military Affairs'),
      BOMBAY_PRESIDENCY => clienttranslate('Bombay Presidency'),
      MADRAS_PRESIDENCY => clienttranslate('Madras Presidency'),
      BENGAL_PRESIDENCY => clienttranslate('Bengal Presidency'),
      SUPERINTENDENT_OF_TRADE_IN_CHINA => clienttranslate('Superintendent of Trade in China'),
      BONUSES => clienttranslate('Bonuses'),
      REVENUE => clienttranslate('Revenue'),
      EVENTS_IN_INDIA => clienttranslate('Events in India'),
      PARLIAMENT_MEETS => clienttranslate('Parliament Meets'),
      UPKEEP_AND_REFRESH => clienttranslate('Upkeep & Refresh'),
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

  public static function increaseCompanyBalance($player, $companyBalance, $companyBalanceIncrease)
  {
    self::notifyAll('moveCompanyBalance', clienttranslate('${player_name} increases Company Balance by ${tkn_boldText_amount} ${tkn_pound}'), [
      'player' => $player,
      'tkn_boldText_amount' => $companyBalanceIncrease,
      'companyBalance' => $companyBalance,
      'tkn_pound' => clienttranslate('Pounds'),
      'i18n' => ['tkn_boldText_value'],
    ]);
  }

  public static function increaseCompanyDebt($player, $companyDebt, $companyBalance)
  {
    self::notifyAll('moveCompanyDebt', clienttranslate('${player_name} increases Company Debt to ${tkn_boldText_value}'), [
      'player' => $player,
      'tkn_boldText_value' => $companyDebt,
      'companyDebt' => $companyDebt,
      'companyBalance' => $companyBalance,
      'i18n' => ['tkn_boldText_value'],
    ]);
  }

  public static function adjustCompanyStanding($companyStanding, $numberOfSpaces)
  {
    $text = $numberOfSpaces < 0 ?
      clienttranslate('Company Standing moves ${tkn_boldText_spaces} space to the left') :
      clienttranslate('Company Standing moves ${tkn_boldText_spaces} space to the right');

    self::notifyAll('moveCompanyStanding', $text, [
      'tkn_boldText_spaces' => abs($numberOfSpaces),
      'companyStanding' => $companyStanding,
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

  public static function payDividends($player, $numberOfDividends, $companyBalance, $totalCost)
  {
    $text = $numberOfDividends === 1 ?
      clienttranslate('${player_name} spends ${amount} ${tkn_pound} from the Company Balance to pay ${tkn_boldText_one} dividend') :
      clienttranslate('${player_name} spends ${amount} ${tkn_pound} from the Company Balance to pay ${tkn_boldText_number} dividends');

    self::notifyAll('moveCompanyBalance', $text, [
      'player' => $player,
      'tkn_pound' => self::tknPound(),
      'amount' => $totalCost,
      'companyBalance' => $companyBalance,
      'tkn_boldText_number' => $numberOfDividends,
      'tkn_boldText_one' => 1,
    ]);
  }

  public static function payFromTreasury($player, $office, $amount, $treasury)
  {
    self::notifyAll('payFromTreasury', clienttranslate('${player_name} spends ${amount} ${tkn_pound} from the ${tkn_boldText_office} treasury'), [
      'player' => $player,
      'tkn_pound' => self::tknPound(),
      'officeId' => $office->getId(),
      'amount' => $amount,
      'treasury' => $treasury,
      'tkn_boldText_office' => $office->getTitle(),
      'i18n' => ['tkn_boldText_office'],
    ]);
  }

  public static function gainPromiseCubes($player, $amount)
  {
    self::notifyAll('transferPromiseCubes', clienttranslate('${player_name} gains ${tkn_boldText_amount} ${tkn_promiseCube} from the ${tkn_boldText_crown}'), [
      'player' => $player,
      'tkn_promiseCube' => self::tknPromiseCube(),
      'amount' => $amount,
      'tkn_boldText_amount' => $amount,
      'tkn_boldText_crown' => clienttranslate('Crown'),
      'i18n' => ['tkn_boldText_crown'],
    ]);
  }

  public static function payPromiseCubes($player, $amount)
  {
    self::notifyAll('transferPromiseCubes', clienttranslate('${player_name} pays ${tkn_boldText_amount} ${tkn_promiseCube} to the ${tkn_boldText_crown}'), [
      'player' => $player,
      'tkn_promiseCube' => self::tknPromiseCube(),
      'amount' => $amount,
      'tkn_boldText_amount' => abs($amount),
      'tkn_boldText_crown' => clienttranslate('Crown'),
      'i18n' => ['tkn_boldText_crown'],
    ]);
  }

  public static function payPromiseCubesForConsent($player, $amount)
  {
    self::notifyAll('transferPromiseCubes', clienttranslate('${player_name} pays ${tkn_boldText_amount} ${tkn_promiseCube} to the ${tkn_playerName_crown} to give consent'), [
      'player' => $player,
      'tkn_playerName_crown' => Players::get(CROWN_PLAYER_ID)->getName(),
      'tkn_promiseCube' => self::tknPromiseCube(),
      'amount' => $amount,
      'tkn_boldText_amount' => abs($amount),
      'tkn_boldText_crown' => clienttranslate('Crown'),
      'i18n' => ['tkn_boldText_crown'],
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

  public static function regionBecomesPartOfEmpire($region, $capital)
  {
    self::notifyAll('updateRegion', clienttranslate('${tkn_boldText_region} becomes part of the ${tkn_boldText_capital} empire'), [
      'tkn_boldText_region' => $region->getName(),
      'tkn_boldText_capital' => $capital->getName(),
      'region' => $region->jsonSerialize(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function regionBecomesSovereign($region)
  {
    self::notifyAll('updateRegion', clienttranslate('${tkn_boldText_region} becomes sovereign'), [
      'tkn_boldText_region' => $region->getName(),
      'region' => $region->jsonSerialize(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function returnFamilyMemberToSupply($player, $familyMember)
  {
    self::notifyAll('returnFamilyMemberToSupply', clienttranslate('${player_name} returns a family member to their supply'), [
      'player' => $player,
      'familyMember' => $familyMember,
    ]);
  }

  public static function makeCheck($player, $diceResults, $checkResult)
  {
    $translatedResultMap = [
      SUCCESS => clienttranslate('success'),
      FAILURE => clienttranslate('failure'),
      CATASTROPHIC_FAILURE => clienttranslate('catastrophic failure')
    ];

    $args = [];
    $log = '';

    foreach ($diceResults as $index => $result) {
      $key = 'die_' . $index;
      $log = $log . implode('', [' ', '${', $key, '}']);
      $args[$key] = $result;
    }

    Notifications::notifyAll('makeCheck', clienttranslate('${player_name} makes a check and rolls ${diceResultsLog}: the check is a ${tkn_boldText_checkResult}'), [
      'player' => $player,
      'diceResults' => $diceResults,
      'diceResultsLog' => [
        'log' => $log,
        'args' => $args,
      ],
      // 'result' => $checkResult,
      'tkn_boldText_checkResult' => $translatedResultMap[$checkResult],
      'i18n' => ['tkn_boldText_checkResult']
    ]);
  }

  public static function moveFamilyMember($player, $familyMember, $to)
  {
    self::notifyAll('moveFamilyMember', clienttranslate('${player_name} moves ${tkn_familyMember} from ${tkn_boldText_from} to ${tkn_boldText_to}'), [
      'player' => $player,
      'familyMember' => $familyMember->jsonSerialize(),
      'to' => $to,
      'tkn_familyMember' => self::tknFamilyMember($familyMember),
      'tkn_boldText_from' => self::getLocationNameForFamilyMember($familyMember->getLocation()),
      'tkn_boldText_to' => self::getLocationNameForFamilyMember($to),
      'i18n' => ['tkn_boldText_from', 'tkn_boldText_to'],
    ]);
  }

  public static function moveRegiment($player, $regiment, $from)
  {
    self::notifyAll('moveRegiment', clienttranslate('${player_name} moves ${tkn_regiment} from the army of ${tkn_boldText_from} to the army of ${tkn_boldText_to}'), [
      'player' => $player,
      'regiment' => $regiment->jsonSerialize(),
      'from' => $from,
      'tkn_regiment' => self::tknRegiment(),
      'tkn_boldText_from' => self::getRegionNameForArmy($from),
      'tkn_boldText_to' => self::getRegionNameForArmy($regiment->getLocation()),
      'i18n' => ['tkn_boldText_from', 'tkn_boldText_to'],
    ]);
  }

  public static function moveShip($player, $ship, $from)
  {
    self::notifyAll('moveShip', clienttranslate('${player_name} moves the ${tkn_boldText_shipName} from ${tkn_boldText_from} to ${tkn_boldText_to}'), [
      'player' => $player,
      'ship' => $ship->jsonSerialize(),
      'from' => $from,
      'tkn_boldText_shipName' => $ship->getName(),
      'tkn_boldText_from' => self::getSeaName($from),
      'tkn_boldText_to' => self::getSeaName($ship->getLocation()),
      'i18n' => ['tkn_boldText_shipName', 'tkn_boldText_from', 'tkn_boldText_to'],
    ]);
  }

  public static function payCompanyExpenses($companyBalance)
  {
    self::notifyAll('moveCompanyBalance', clienttranslate('Company Balance is lowered to ${tkn_boldText_amount} ${tkn_pound}'), [
      'tkn_boldText_amount' => $companyBalance,
      'companyBalance' => $companyBalance,
      'tkn_pound' => clienttranslate('Pounds'),
    ]);
  }

  public static function removeUnrest($region)
  {
    self::notifyAll('updateRegion', clienttranslate('All unrest in ${tkn_boldText_region} is removed'), [
      'tkn_boldText_region' => $region->getName(),
      'region' => $region->jsonSerialize(),
      'i18n' => ['tkn_boldText_region']
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

  public static function formEmpire($region)
  {
    self::notifyAll('updateRegion', clienttranslate('The ${tkn_boldText_region} empire is formed'), [
      'region' => $region->jsonSerialize(),
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function shatterEmpire($region)
  {
    self::notifyAll('updateRegion', clienttranslate('The ${tkn_boldText_region} empire shatters'), [
      'region' => $region->jsonSerialize(),
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function updateTowerLevel($region, $change)
  {
    $text = '';
    if ($change === 1) {
      $text = clienttranslate('A tower level is added to ${tkn_boldText_region}');
    } else if ($change > 0) {
    } else if ($change === -1) {
      $text = clienttranslate('${tkn_boldText_region} loses a tower level');
    } else if ($change < 0) {
    }

    self::notifyAll('updateRegion', $text, [
      'region' => $region->jsonSerialize(),
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }
}
