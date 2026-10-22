<?php

namespace Bga\Games\JohnCompany\Boilerplate\Core;

use Bga\GameFramework\NotificationMessage;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\JoCoUtils;
use Bga\Games\JohnCompany\Managers\ControlTokens;
use Bga\Games\JohnCompany\Managers\EventTiles;
use Bga\Games\JohnCompany\Managers\Parliament;
use Bga\Games\JohnCompany\Managers\Players;
use Bga\Games\JohnCompany\Managers\Prizes;
use Bga\Games\JohnCompany\Managers\Regions;
use Bga\Games\JohnCompany\Managers\Ships;
use Bga\Games\JohnCompany\Models\ArmyPiece;
use Bga\Games\JohnCompany\Models\Enterprise;
use Bga\Games\JohnCompany\Models\EventTile;
use Bga\Games\JohnCompany\Models\Family;
use Bga\Games\JohnCompany\Models\FamilyMember;
use Bga\Games\JohnCompany\Models\LawCard;
use Bga\Games\JohnCompany\Models\LondonSeasonCard;
use Bga\Games\JohnCompany\Models\Office;
use Bga\Games\JohnCompany\Models\Order;
use Bga\Games\JohnCompany\Models\Player;
use Bga\Games\JohnCompany\Models\Region;
use Bga\Games\JohnCompany\Models\Ship;

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

  public static function message(string $txt, $args = [])
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
    return clienttranslate('Promise Cube(s)');
  }

  public static function tknUnrest()
  {
    return clienttranslate('Unrest');
  }

  public static function tknRegiment()
  {
    return clienttranslate('Regiment');
  }

  public static function tknArmyPiece(ArmyPiece $armyPiece)
  {
    $armyPieceType = $armyPiece->getType();
    if ($armyPieceType == REGIMENT) {
      return clienttranslate('Regiment');
    } elseif ($armyPieceType == LOCAL_ALLIANCE) {
      return $armyPiece->getId();
    }
  }

  public static function tknFamilyMember(FamilyMember $familyMember)
  {
    $number = intval(explode('_', $familyMember->getId())[2]) % 18;

    return implode(':', [$familyMember->getFamilyId(), $number]);
  }

  public static function tknShip(Ship $ship)
  {
    return implode(':', [$ship->getSide(), $ship->getName()]);
  }

  public static function getEnterpriseName(string $enterpriseType)
  {
    $enterpriseNameMap = [
      LUXURY => clienttranslate('Luxury'),
      SHIPYARD => clienttranslate('Shipyard'),
      WORKSHOP => clienttranslate('Workshop'),
    ];
    return $enterpriseNameMap[$enterpriseType];
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private static function getShipsLog(array $ships)
  {
    $shipsLog = '';
    $shipsLogArgs = [];

    foreach ($ships as $index => $ship) {
      $key = 'tkn_ship_' . $index;
      $shipsLog = $shipsLog . '${' . $key . '}';
      $shipsLogArgs[$key] = self::tknShip($ship);
    }

    return [
      'log' => $shipsLog,
      'args' => $shipsLogArgs,
    ];
  }

  private static function getEnterpriseLog(array $enterprises)
  {
    $log = '';
    $args = [];

    foreach ($enterprises as $index => $enterprise) {
      $key = 'tkn_enterpriseCard_' . $index;
      $log = $log . '${' . $key . '}';
      $args[$key] = $enterprise->getId();
    }

    return [
      'log' => $log,
      'args' => $args,
    ];
  }

  private static function getLondonSeasonCardLog(array $londonSeasonCards)
  {
    $log = '';
    $args = [];

    foreach ($londonSeasonCards as $index => $londonSeasonCard) {
      $key = 'tkn_londonSeasonCard_' . $index;
      $log = $log . '${' . $key . '}';
      $args[$key] = $londonSeasonCard->getId();
    }

    return [
      'log' => $log,
      'args' => $args,
    ];
  }


  // Can consist of FamilyMembers and army pieces
  private static function createPiecesLog(array $pieces)
  {
    $piecesLog = '';
    $piecesLogArgs = [];

    $logTokensMap = [
      REGIMENT => 'tkn_regiment_',
      LOCAL_ALLIANCE => 'tkn_localAlliance_',
      FAMILY_MEMBER => 'tkn_familyMember_',
    ];

    foreach ($pieces as $index => $piece) {
      if (Utils::startsWith($piece->getId(), 'familyMember')) {
        $pieceType = FAMILY_MEMBER;
      } else {
        $pieceType = $piece->getType();
      }

      $key = $logTokensMap[$pieceType] . $index;
      $piecesLog = $piecesLog . '${' . $key . '}';
      $piecesLogArgs[$key] = $pieceType == FAMILY_MEMBER ? self::tknFamilyMember($piece) : self::tknArmyPiece($piece);
    }

    return [
      'log' => $piecesLog,
      'args' => $piecesLogArgs,
    ];
  }

  private static function getRegionNameForArmy(string $armyLocation)
  {
    $regionId = explode('_', $armyLocation)[1];

    $idNameMap = [
      BENGAL_PRESIDENCY => clienttranslate('Bengal'),
      BOMBAY_PRESIDENCY => clienttranslate('Bombay'),
      MADRAS_PRESIDENCY => clienttranslate('Madras'),
    ];
    return $idNameMap[$regionId];
  }

  private static function getSeaName(string $locationId)
  {
    if (Utils::startsWith($locationId, 'shipConstruction_')) {
      $regionId = explode('_', $locationId)[1];
      return Regions::get($regionId)->getName();
    }

    $idNameMap = [
      EAST_INDIAN => clienttranslate('East Indian'),
      SOUTH_INDIAN => clienttranslate('South Indian'),
      WEST_INDIAN => clienttranslate('West Indian'),
      CHINA => clienttranslate('China'),
      SUPERINTENDENT_OF_TRADE_IN_CHINA => clienttranslate('China'),
    ];
    return $idNameMap[$locationId];
  }

  public static function getOpportunityMarkerText(string | null $opportunityMarker)
  {

    $map = [
      ENLIST_WRITER => clienttranslate('Enlist Writer'),
      ENLIST_OFFICER =>  clienttranslate('Officer in Training'),
      SEEK_SHARE => clienttranslate('Seek Share'),
      PURCHASE_LUXURY => clienttranslate('Buy Luxury'),
      PURCHASE_SHIPYARD => clienttranslate('Buy Shipyard'),
      PURCHASE_WORKSHOP => clienttranslate('Buy Workshop'),
      REMOVED => clienttranslate('Removed'),
    ];

    if ($opportunityMarker !== null && isset($map[$opportunityMarker])) {
      return $map[$opportunityMarker];
    }
    return clienttranslate('Not placed');
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

  public static function getLocationNameForFamilyMember(string $location)
  {
    // TODO: this needs to be used for more than just the current locations, potentially all locations for family members?
    $locationNameMap = [
      BENGAL_WRITERS  => clienttranslate('Bengal'),
      BOMBAY_WRITERS => clienttranslate('Bombay'),
      MADRAS_WRITERS => clienttranslate('Madras'),
      Locations::armyOfReady(BENGAL_PRESIDENCY) => clienttranslate('Army of Bengal'),
      Locations::armyOfReady(BOMBAY_PRESIDENCY) => clienttranslate('Army of Bombay'),
      Locations::armyOfReady(MADRAS_PRESIDENCY) => clienttranslate('Army of Madras'),
      Locations::armyOfExhausted(BENGAL_PRESIDENCY) => clienttranslate('Army of Bengal'),
      Locations::armyOfExhausted(BOMBAY_PRESIDENCY) => clienttranslate('Army of Bombay'),
      Locations::armyOfExhausted(MADRAS_PRESIDENCY) => clienttranslate('Army of Madras'),
      OFFICER_IN_TRAINING => clienttranslate('Officers-in-training'),
      PENSIONERS => clienttranslate('Pensioners'),
    ];
    if (!isset($locationNameMap[$location])) {
      throw new \Bga\GameFramework\VisibleSystemException("ERROR_021: " . $location);
    }
    return $locationNameMap[$location];
  }

  public static function getArmyNameForPresidency(string $presidencyId)
  {
    $armyNameMap = [
      BENGAL_PRESIDENCY => clienttranslate('Army of Bengal'),
      BOMBAY_PRESIDENCY => clienttranslate('Army of Bombay'),
      MADRAS_PRESIDENCY => clienttranslate('Army of Madras'),
    ];
    return isset($armyNameMap[$presidencyId]) ? $armyNameMap[$presidencyId] : 'Unmapped army';
  }

  public static function getPolicyLog(int $policyIndex): array
  {
    $policy = PRIME_MINISTER_DIAL[$policyIndex];
    $windowTax = $policy[WINDOW_TAX]  ?? false;

    return [
      'log' => $windowTax ? clienttranslate('${policyConsequence} ${tkn_icon} & Window Tax') : '${policyConsequence} ${tkn_icon}',
      'args' => [
        'policyConsequence' => JoCoUtils::getPolicyConsequenceTranslation($policy[CONSEQUENCE]),
        'tkn_icon' => $policy[TARGET],
        'i18n' => ['policyConsequence'],
      ],
    ];
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

  public static function allocateBalanceToOffice($player, $office, $amount, $companyBalance, $officeTreasury)
  {
    self::notifyAll('allocateBalanceToOffice', clienttranslate('${player_name} allocates ${amount} ${tkn_pound} to the ${tkn_boldText_office}'), [
      'player' => $player,
      'amount' => $amount,
      'companyBalance' => $companyBalance,
      'officeTreasury' => $officeTreasury,
      'tkn_boldText_office' => $office->getTitle(),
      'tkn_pound' => self::tknPound(),
      'officeId' => $office->getId(),
      'i18n' => ['tkn_boldText_office'],
    ]);
  }

  public static function setCrownClimate($player, $climate)
  {
    self::notifyAll('setCrownClimate', clienttranslate('${player_name} sets climate to ${tkn_climate}'), [
      'player' => $player,
      'climate' => $climate,
      'tkn_climate' => $climate,
    ]);
  }

  public static function changePrimeMinister(Player $player, string $familyId)
  {
    self::notifyAll('changePrimeMinister', clienttranslate('${player_name} becomes ${tkn_boldText_primeMinister}'), [
      'player' => $player,
      'tkn_boldText_primeMinister' => clienttranslate('Prime Minister'),
      'familyId' => $familyId,
      'i18n' => ['tkn_boldText_primeMinister'],
    ]);
  }

  public static function changeOrderStatus(Player | null $player, Order $order, string $status, $noMessage = false)
  {
    $args = [];
    $text = '';

    if ($player === null && $status === OPEN) {
      $text = clienttranslate('An order in ${tkn_boldText_region} is opened');
    } else if ($player === null && $status === CLOSED) {
      $text = clienttranslate('An order in ${tkn_boldText_region} is closed');
    } else if ($player !== null && $status === OPEN) {
      $text = clienttranslate('${player_name} opens an order in ${tkn_boldText_region}');
      $args['player'] = $player;
    } else if ($player !== null && $status === CLOSED) {
      $text = clienttranslate('${player_name} closes an order in ${tkn_boldText_region}');
      $args['player'] = $player;
    }

    if ($noMessage) {
      $text = '';
    }

    self::notifyAll('changeOrderStatus', $text, array_merge([
      'tkn_boldText_region' => Regions::get($order->getLocation())->getName(),
      'order' => $order->jsonSerialize(),
      'i18n' => ['tkn_boldText_region'],
    ], $args));
  }

  public static function companyFailure()
  {
    self::notifyAll('companyFailure', clienttranslate('Company failure!!'), []);
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

  public static function crisisResult(int $attackStrength, int $defenderStrength, string $type)
  {
    $text = $attackStrength > $defenderStrength ?
      clienttranslate('The ${crisisType} succeeds with a total of ${tkn_boldText_attackerTotal} vs ${tkn_boldText_defenderTotal}') :
      clienttranslate('The ${crisisType} fails with a total of ${tkn_boldText_attackerTotal} vs ${tkn_boldText_defenderTotal}');

    $crisisType = null;
    if (in_array($type, [INVASION, INVASION_AGAINST_COMPANY])) {
      $crisisType = clienttranslate('Invasion');
    } else if (in_array($type, [FOREIGN_INVASION, FOREIGN_INVASION_AGAINST_COMPANY])) {
      $crisisType = clienttranslate('Foreign Invasion');
    } else {
      $crisisType = clienttranslate('Rebellion');
    }

    Notifications::message($text, [
      'crisisType' => $crisisType,
      'tkn_boldText_attackerTotal' => $attackStrength,
      'tkn_boldText_defenderTotal' => $defenderStrength,
      'i18n' => ['crisisType'],
    ]);
  }

  public static function exhaustPieces(Player $player, array $selectedPieces)
  {
    self::notifyAll('movePieces', clienttranslate('${player_name} exhausts ${piecesLog}'), [
      'player' => $player,
      'pieces' => $selectedPieces,
      'piecesLog' => self::createPiecesLog($selectedPieces),
      'i18n' => [],
    ]);
  }

  public static function deployPieces(Player $player, array $selectedPieces, string $regionId)
  {
    self::notifyAll('movePieces', clienttranslate('${player_name} deploys ${piecesLog} to ${tkn_boldText_region}'), [
      'player' => $player,
      'pieces' => $selectedPieces,
      'piecesLog' => self::createPiecesLog($selectedPieces),
      'tkn_boldText_region' => Regions::getAll()[$regionId]->getName(),
      'i18n' => ['tkn_boldText_region'],
    ]);
  }

  public static function discardLondonSeasonCard(LondonSeasonCard $card, $player = null, $from = null)
  {
    $text = '';
    $args = [];
    if ($player === null && $from !== null) {
      $text = clienttranslate('${tkn_londonSeasonCard} is discarded from ${from}');
      $args['from'] = $from === LONDON_SEASON_DISPLAY ? clienttranslate('the London Season display') : $from;
      $args['i18n'] = ['from'];
    } else if ($player === null) {
      $text = clienttranslate('${tkn_londonSeasonCard} is discarded');
    } else if ($player !== null && $from !== null) {
      $text = clienttranslate('${player_name} discards ${tkn_londonSeasonCard} from ${from}');
      $args['from'] = $from === LONDON_SEASON_DISPLAY ? clienttranslate('the London Season display') : $from;
      $args['i18n'] = ['from'];
    } else if ($player !== null) {
      $text = clienttranslate('${player_name} discards ${tkn_londonSeasonCard}');
    }

    self::notifyAll('discardLondonSeasonCard', $text, array_merge([
      'card' => $card->getType() === BLACKMAIL ? $card->jsonSerializePrivate() : $card->jsonSerialize(),
      'tkn_londonSeasonCard' => $card->getId(),
      'player' => $player,
    ], $args));
  }

  public static function newLondonSeasonDisplay(array $cards)
  {
    self::notifyAll('newLondonSeasonDisplay', clienttranslate('The London Season display is refilled'), [
      'cards' => array_map(fn($card) => $card->jsonSerialize(), $cards),
      'tkn_boldText_nbr' => count($cards),
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

  public static function drawEventTile(EventTile $eventTile)
  {
    $topOfDeck = EventTiles::getTopOf(DECK);
    $regionName = $topOfDeck !== null ? Regions::get($topOfDeck->getRegionId())->getName() : null;

    self::notifyAll('drawEventTile', $eventTile->getNotificationText(), [
      'eventTile' => $eventTile->jsonSerialize(),
      'tkn_boldText_eventTitle' => $eventTile->getTitle(),
      'tkn_boldText_region' => $regionName,
      'i18n' => ['tkn_boldText_eventTitle', 'tkn_boldText_region'],
      'topOfDeck' => $topOfDeck->jsonSerialize()
    ]);
  }

  public static function elephantMarch(array $elephant, $redirect = false)
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
      $text = $redirect ? clienttranslate('The ${tkn_elephant} redirects to ${tkn_boldText_region}') : clienttranslate('The ${tkn_elephant} marches to ${tkn_boldText_region}');
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

  public static function emergencyLoans(int $companyDebt, int $numberOfEmergencyLoans, int $remainingExpenses)
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
      clienttranslate('${player_name} places ${tkn_familyMember} on an order with value of ${tkn_boldText_amount} in ${tkn_boldText_regionName}') :
      clienttranslate('${player_name} places a filled order token on an order with value of ${tkn_boldText_amount} in ${tkn_boldText_regionName}');

    $args = [
      'player' => $player,
      'amount' => $order->getValue(),
      'tkn_boldText_amount' => '£' . $order->getValue(),
      'from' => $from,
      'tkn_boldText_regionName' => $order->getRegion()->getName(),
      'order' => $order->jsonSerialize(),
      'familyMember' => $familyMember,
      'i18n' => ['tkn_boldText_regionName'],
    ];
    if ($filledByWriter) {
      $args['tkn_familyMember'] = self::tknFamilyMember($familyMember);
    }

    self::notifyAll('fillOrder', $text, $args);
  }

  public static function flipShip(Player $player, Ship $ship)
  {
    self::notifyAll('flipShip', clienttranslate('${player_name} flips the ${tkn_boldText_shipName} to ${tkn_ship}'), [
      'player' => $player,
      'tkn_boldText_shipName' => $ship->getName(),
      'ship' => $ship->jsonSerialize(),
      'tkn_ship' => self::tknShip($ship),
      'i18n' => ['tkn_boldText_shipName'],
    ]);
  }

  public static function foreignInvasion(string $regionName, int $dieRoll, int $unrest = 0)
  {
    $text = clienttranslate('${tkn_boldText_foreignInvasion} in ${tkn_boldText_defender} with strength of ${tkn_boldText_strength}');

    if ($unrest > 0) {
      $text = clienttranslate('${tkn_boldText_foreignInvasion} in ${tkn_boldText_defender} with a strength of ${tkn_boldText_strength} (+${tkn_boldText_unrest} for unrest)');
    }

    Notifications::message($text, [
      'tkn_boldText_foreignInvasion' => clienttranslate('Foreign Invasion'),
      'tkn_boldText_defender' => $regionName,
      'tkn_boldText_strength' => $dieRoll,
      'tkn_boldText_unrest' => $unrest,
      'i18n' => ['tkn_boldText_foreignInvasion', 'tkn_boldText_defender'],
    ]);
  }

  public static function frontendTrigger(string $trigger)
  {
    self::notifyAll('frontendTrigger', '', [
      'trigger' => $trigger,
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

  public static function moveLaw(Player $player, LawCard $law, string | null $text, array | null $textArgs)
  {

    $text = $text ?? '';
    $textArgs = $textArgs ?? [];

    self::notifyAll('moveLaw', $text, array_merge($textArgs, [
      'player' => $player,
      'law' => $law->jsonSerialize(),
    ]));
  }

  public static function moveOfficeCard(Office $office, string $text, array $textArgs)
  {
    self::notifyAll('moveOfficeCard', $text, array_merge($textArgs, [
      'office' => $office->jsonSerialize(),
    ]));
  }

  public static function getPhaseName(string $phase)
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
      LONDON_SEASON => clienttranslate('The London Season'),
      BONUSES => clienttranslate('Bonuses'),
      REVENUE => clienttranslate('Revenue'),
      EVENTS_IN_INDIA => clienttranslate('Events in India'),
      PARLIAMENT_MEETS => clienttranslate('Parliament Meets'),
      UPKEEP_AND_REFRESH => clienttranslate('Upkeep & Refresh'),
      FINAL_SCORING => clienttranslate('Final Scoring'),
    ];
    $text = isset($phaseNameMap[$phase]) ? $phaseNameMap[$phase] : $phase;
    return $text;
  }

  public static function nextPhase(string $phase)
  {
    self::notifyAll('nextPhase', self::getPhaseName($phase), [
      'phase' => $phase,
    ]);
  }

  public static function updateFamilyTreasury(Player $player, int $cash)
  {
    $text = $cash <= 0 ? clienttranslate('${player_name} pays ${tkn_boldText_amount}') : clienttranslate('${player_name} gains ${tkn_boldText_amount}');


    self::notifyAll('updateFamilyTreasury', $text, [
      'player' => $player,
      'amount' => $cash,
      'tkn_boldText_amount' => '£' . abs($cash),
      'tkn_pound' => clienttranslate('Pounds')
    ]);
  }

  public static function openTradeWithChina(Player $player)
  {
    self::notifyAll('openTradeWithChina', clienttranslate('${player_name} opens trade with China'), [
      'player' => $player,
    ]);
  }

  public static function payTax(Player $player, int $amount, string $target)
  {
    $targetName = $target === SHARE ? clienttranslate('Shares') : self::getEnterpriseName($target);
    self::notifyAll('updateFamilyTreasury', clienttranslate('${player_name} pays ${tkn_boldText_amount} in taxes'), [
      'player' => $player,
      'amount' => -$amount,
      'tkn_boldText_amount' => '£' . $amount,
      'targetName' => $targetName,
      'i18n' => ['targetName'],
      'tkn_pound' => clienttranslate('Pounds'),
    ]);
  }

  public static function payWindowTax(Player $player, int $amount)
  {
    self::notifyAll('updateFamilyTreasury', clienttranslate('${player_name} pays a window tax of ${tkn_boldText_amount}'), [
      'player' => $player,
      'amount' => -$amount,
      'tkn_boldText_amount' => '£' . $amount,
      'tkn_pound' => clienttranslate('Pounds'),
    ]);
  }

  public static function gainPassedLawTokens(Player $player, int $number)
  {
    $counterChanges = [
      $player->getFamilyId() => [PASSED_LAW_TOKENS => $number],
    ];
    self::updateCountersMultipleTargets($counterChanges, clienttranslate('${player_name} gains ${tkn_boldText_number} ${tkn_passedLawToken}'), [
      'player' => $player,
      'tkn_boldText_number' => $number,
      'tkn_passedLawToken' => clienttranslate('Passed Law Token'),
    ]);
  }

  public static function gainTrophies(Player $player, int $amount)
  {
    if ($amount <= 0) {
      Notifications::message(clienttranslate('${player_name} does not take any ${tkn_trophy}'), [
        'player' => $player,
        'tkn_trophy' => clienttranslate('Trophies'),
      ]);
      return;
    }

    $counterChanges = [
      $player->getFamilyId() => [TROPHIES => $amount],
    ];
    self::updateCountersMultipleTargets($counterChanges, clienttranslate('${player_name} takes ${tkn_boldText_amount} ${tkn_trophy}'), [
      'player' => $player,
      'tkn_boldText_amount' => $amount,
      'tkn_trophy' => clienttranslate('Trophies'),
    ]);
  }

  public static function loseHalfTrophiesRoundedUp(Player $player, int $number)
  {
    if ($number === 0) {
      Notifications::message(clienttranslate('${player_name} does not lose any ${tkn_trophy}'), [
        'player' => $player,
        'tkn_trophy' => clienttranslate('Trophies'),
      ]);
      return;
    }

    $counterChanges = [
      $player->getFamilyId() => [TROPHIES => -$number],
    ];
    self::updateCountersMultipleTargets($counterChanges, clienttranslate('${player_name} loses ${tkn_boldText_amount} ${tkn_trophy}'), [
      'player' => $player,
      'tkn_boldText_amount' => $number,
      'tkn_trophy' => clienttranslate('Trophies'),
    ]);
  }

  public static function updateCountersMultipleTargets(array $counterChangesPerTarget, $text = '', $textArgs = [])
  {
    self::notifyAll('updateCountersMultipleTargets', $text, array_merge([
      'counterChanges' => $counterChangesPerTarget,
    ], $textArgs));
  }

  public static function updateCompanyDebt(int $companyDebt, $text = '', $textArgs = [])
  {
    self::notifyAll('updateCompanyDebt', $text, array_merge([
      'companyDebt' => $companyDebt,
    ], $textArgs));
  }

  public static function increaseCompanyBalance(Player | null $player, int $companyBalance, int $companyBalanceIncrease)
  {
    $text = clienttranslate('${player_name} increases Company Balance by ${tkn_boldText_amount}');
    $textArgs = [
      'player' => $player,
    ];
    if ($player === null) {
      $text = clienttranslate('Company Balance increases by ${tkn_boldText_amount}');
      $textArgs = [];
    }

    self::notifyAll('moveCompanyBalance', $text, array_merge([
      'player' => $player,
      'tkn_boldText_amount' => '£' . $companyBalanceIncrease,
      'companyBalance' => $companyBalance,
      'i18n' => ['tkn_boldText_value'],
    ], $textArgs));
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
      clienttranslate('${player_name} spends ${tkn_boldText_amount} from the Company Balance to pay ${tkn_boldText_one} dividend') :
      clienttranslate('${player_name} spends ${tkn_boldText_amount} from the Company Balance to pay ${tkn_boldText_number} dividends');

    self::notifyAll('moveCompanyBalance', $text, [
      'player' => $player,
      'amount' => $totalCost,
      'tkn_boldText_amount' => '£' . $totalCost,
      'companyBalance' => $companyBalance,
      'tkn_boldText_number' => $numberOfDividends,
      'tkn_boldText_one' => 1,
    ]);
  }

  public static function parliamentMeetsCleanup(array $parliamentData, array $londonSeasonCards, array $enterpriseCards)
  {
    self::notifyAll('parliamentMeetsCleanup', '', [
      'parliamentData' => $parliamentData,
      'londonSeasonCards' => $londonSeasonCards,
      'enterpriseCards' => $enterpriseCards,
    ]);
  }

  public static function addCashToOffice(Player $player, Office $office, int $amount, int $treasury)
  {
    self::notifyAll('addToTreasury', clienttranslate('${player_name} adds ${tkn_boldText_amount} to the ${tkn_boldText_office} treasury'), [
      'player' => $player,
      'tkn_pound' => self::tknPound(),
      'officeId' => $office->getId(),
      'tkn_boldText_amount' => '£' . $amount,
      'amount' => $amount,
      'treasury' => $treasury,
      'tkn_boldText_office' => $office->getTitle(),
      'i18n' => ['tkn_boldText_office'],
    ]);
  }

  public static function addCashToCompanyBalance(Player $player, int $amount, int $companyBalance)
  {
    self::notifyAll('moveCompanyBalance', clienttranslate('${player_name} adds ${tkn_boldText_amount} to the ${tkn_boldText_companyBalance}'), [
      'player' => $player,
      'tkn_boldText_amount' => '£' . $amount,
      'amount' => $amount,
      'companyBalance' => $companyBalance,
      'tkn_boldText_companyBalance' => clienttranslate('Company Balance'),
      'i18n' => ['tkn_boldText_companyBalance'],
    ]);
  }

  public static function payFromTreasury(Player $player, Office $office, int $amount, int $treasury)
  {
    self::notifyAll('payFromTreasury', clienttranslate('${player_name} spends ${tkn_boldText_amount} from the ${tkn_boldText_office} treasury'), [
      'player' => $player,
      'tkn_pound' => self::tknPound(),
      'officeId' => $office->getId(),
      'amount' => $amount,
      'tkn_boldText_amount' => '£' . $amount,
      'treasury' => $treasury,
      'tkn_boldText_office' => $office->getTitle(),
      'i18n' => ['tkn_boldText_office'],
    ]);
  }

  public static function gainPromiseCubes(Player $player, int $amount)
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

  public static function payPromiseCubes(Player $player, int $amount)
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

  public static function payPromiseCubesForConsent(Player $player, int $amount)
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

  public static function payPromiseCubesToBuyCompanyShip($player, $amount, $ships)
  {
    self::notifyAll('transferPromiseCubes', clienttranslate('${player_name} pays ${tkn_boldText_amount} ${tkn_promiseCube} to the ${tkn_playerName_crown} to buy ${shipsLog}'), [
      'player' => $player,
      'tkn_playerName_crown' => Players::get(CROWN_PLAYER_ID)->getName(),
      'tkn_promiseCube' => self::tknPromiseCube(),
      'amount' => -$amount,
      'tkn_boldText_amount' => abs($amount),
      'tkn_boldText_crown' => clienttranslate('Crown'),
      'shipsLog' => self::getShipsLog($ships),
      'i18n' => ['tkn_boldText_crown'],
    ]);
  }

  public static function buyCompanyShips($player, $ships)
  {
    self::message(clienttranslate('${player_name} buys ${shipsLog}'), [
      'player' => $player,
      'shipsLog' => self::getShipsLog($ships),
    ]);
  }

  public static function fitShips($player, $ships)
  {
    self::message(clienttranslate('${player_name} fits ${shipsLog}'), [
      'player' => $player,
      'shipsLog' => self::getShipsLog($ships),
    ]);
  }

  public static function leaseExtraShips($player, $ships)
  {
    self::message(clienttranslate('${player_name} leases ${shipsLog}'), [
      'player' => $player,
      'shipsLog' => self::getShipsLog($ships),
    ]);
  }

  public static function placeRegiment(Player $player, ArmyPiece $regiment, string $presidencyId)
  {
    self::notifyAll('placeRegiment', clienttranslate('${player_name} places ${tkn_regiment} in the ${tkn_boldText_army}'), [
      'player' => $player,
      'regiment' => $regiment->jsonSerialize(),
      'tkn_regiment' => self::tknArmyPiece($regiment),
      'tkn_boldText_army' => self::getArmyNameForPresidency($presidencyId),
      'i18n' => ['tkn_boldText_army'],
    ]);
  }

  public static function placeShip(Player $player, Ship $ship)
  {
    $location = $ship->getLocation();
    $text = '';
    $args = [];

    if (Utils::startsWith($location, 'shipConstruction_')) {
      $text = clienttranslate('${player_name} builds ${tkn_ship} in the ${tkn_boldText_region}');
      $args = [
        'tkn_boldText_region' => Regions::get(explode('_', $location)[1])->getName(),
        'i18n' => ['tkn_boldText_region']
      ];
    } else {
      $text = clienttranslate('${player_name} places ${tkn_ship} in the ${tkn_boldText_sea}');
      $args = [
        'tkn_boldText_sea' => self::getSeaName($ship->getLocation()),
        'i18n' => ['tkn_boldText_sea']
      ];
    }

    self::notifyAll('placeShip', $text, array_merge([
      'player' => $player,
      'ship' => $ship->jsonSerialize(),
      'tkn_ship' => self::tknShip($ship)
    ], $args));
  }

  public static function purchaseEnterprise(Player $player, Enterprise $enterprise, int $amount, string $familyId)
  {
    self::notifyAll('purchaseEnterprise', clienttranslate('${player_name} pays ${tkn_boldText_amount} to purchase a ${tkn_boldText_enterprise} ${tkn_enterpriseIcon}'), [
      'player' => $player,
      'tkn_boldText_enterprise' => $enterprise->getName(),
      'tkn_enterpriseIcon' => $enterprise->getType(),
      'tkn_boldText_amount' => '£' .  $amount,
      'amount' => $amount,
      'enterprise' => $enterprise,
      'familyId' => $familyId,
      'ship' => $enterprise->getType() === SHIPYARD ? Ships::get($enterprise->getShipId()) : null,
      'type' => $enterprise->getType(),
      'tkn_pound' => clienttranslate('Pounds'),
      'i18n' => ['tkn_boldText_enterprise'],
    ]);
  }

  public static function refreshArmies(array $movedArmyPieces, array $movedOfficers)
  {
    self::notifyAll('refreshArmies', clienttranslate('All officers and regiments become active. All local alliances are exhausted'), [
      'armyPieces' => $movedArmyPieces,
      'officers' => $movedOfficers,
    ]);
  }

  public static function regionBecomesPartOfEmpire(Region $region, Region $capital)
  {
    $text = clienttranslate('${tkn_boldText_region} becomes part of the ${tkn_boldText_capital} empire');
    self::updateRegion($region, $text, [
      'tkn_boldText_region' => $region->getName(),
      'tkn_boldText_capital' => $capital->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function regionBecomesSovereign(Region $region)
  {
    self::updateRegion($region, clienttranslate('${tkn_boldText_region} becomes sovereign'), [
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function returnFamilyMemberToSupply($player, $familyMember)
  {
    self::notifyAll('returnFamilyMemberToSupply', clienttranslate('${player_name} returns ${tkn_familyMember} to their supply'), [
      'player' => $player,
      'familyMember' => $familyMember,
      'tkn_familyMember' => self::tknFamilyMember($familyMember),
    ]);
  }

  public static function returnWritersToPresidencies(array $writersToReturn)
  {
    self::notifyAll('returnWritersToPresidencies', clienttranslate('All writers are returned to their associated Presidency'), [
      'writers' => $writersToReturn,
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

  public static function moveFamilyMember(Player $player, FamilyMember $familyMember, array $options = [])
  {
    $from = $options['from'] ?? null;
    $text = $options['text'] ?? null;
    $textArgs = $options['textArgs'] ?? [];

    if ($text === null) {
      $text = $from !== null ?
        clienttranslate('${player_name} moves ${tkn_familyMember} from ${tkn_boldText_from} to ${tkn_boldText_to}') :
        clienttranslate('${player_name} moves ${tkn_familyMember} to ${tkn_boldText_to}');

      $textArgs = [
        'tkn_boldText_from' => $from !== null ? self::getLocationNameForFamilyMember($from) : '',
        'tkn_boldText_to' => self::getLocationNameForFamilyMember($familyMember->getLocation()),
        'i18n' => ['tkn_boldText_from', 'tkn_boldText_to'],
      ];
    }

    self::notifyAll('moveFamilyMember', $text, array_merge($textArgs, [
      'player' => $player,
      'familyMember' => $familyMember->jsonSerialize(),
      'tkn_familyMember' => self::tknFamilyMember($familyMember),
    ]));
  }

  public static function moveBlackmailCard(Player $player, LondonSeasonCard $card, string $text = '', array $textArgs = [])
  {
    self::notifyAll('moveLondonSeasonCard', $text, array_merge($textArgs, [
      'player' => $player,
      'card' => $card->jsonSerializePrivate(),
    ]));
  }

  public static function moveLondonSeasonCard(Player $player, LondonSeasonCard $card, string | null $from)
  {
    $fromLondonSeasonDisplay = $from === Locations::londonSeasonDisplay();
    $text = clienttranslate('${player_name} takes ${tkn_londonSeasonCard}');

    $playerId = $player->getId();

    Game::get()->notify->all('moveLondonSeasonCard', $text, [
      'player_name' => $player->getName(),
      'playerId' => $playerId,
      'card' => $card->jsonSerialize(),
      'tkn_londonSeasonCard' => $card->getType() === BLACKMAIL ? $card->getPublicId() : $card->getId(),
      '_private' => [
        $playerId => new NotificationMessage(
          clienttranslate('${player_name} takes ${tkn_londonSeasonCard}'),
          [
            'player_name' => $player->getName(),
            'playerId' => $playerId,
            'card' => $card->getType() === BLACKMAIL ? $card->jsonSerializePrivate() : $card->jsonSerialize(),
            'tkn_londonSeasonCard' => $card->getType() === BLACKMAIL ? $card->getPublicId() : $card->getId(),
          ]
        ),
      ]
    ]);
  }

  public static function retireFamilyMember(Player $player, FamilyMember $familyMember, int $cost)
  {
    $text =  clienttranslate('${player_name} pays ${tkn_boldText_cost} and retires ${tkn_familyMember} to the ${tkn_victoryPoints} prize');

    self::notifyAll('retireFamilyMember', $text, [
      'player' => $player,
      'cost' => $cost,
      'familyMember' => $familyMember->jsonSerialize(),
      'tkn_familyMember' => self::tknFamilyMember($familyMember),
      'tkn_boldText_cost' => '£' . $cost,
      'tkn_victoryPoints' => Prizes::get($familyMember->getLocation())[VICTORY_POINTS],
    ]);
  }

  public static function moveRegiment($player, $armyPiece, $from)
  {
    self::notifyAll('moveArmyPiece', clienttranslate('${player_name} moves ${tkn_regiment} from the army of ${tkn_boldText_from} to the army of ${tkn_boldText_to}'), [
      'player' => $player,
      'armyPiece' => $armyPiece->jsonSerialize(),
      'tkn_regiment' => self::tknRegiment(),
      'tkn_boldText_from' => self::getRegionNameForArmy($from),
      'tkn_boldText_to' => self::getRegionNameForArmy($armyPiece->getLocation()),
      'i18n' => ['tkn_boldText_from', 'tkn_boldText_to'],
    ]);
  }

  public static function moveShip(Player $player, Ship $ship, string $from)
  {
    $text = '';
    $textArgs = [];
    if (Utils::startsWith($ship->getLocation(), SHIPYARD)) {
      $text = clienttranslate('${player_name} returns the ${tkn_boldText_shipName} to its Shipyard');
      $textArgs = [
        'i18n' => ['tkn_boldText_shipName'],
      ];
    } else {
      $text = clienttranslate('${player_name} moves the ${tkn_boldText_shipName} from ${tkn_boldText_from} to ${tkn_boldText_to}');
      $textArgs = [
        'tkn_boldText_from' => self::getSeaName($from),
        'tkn_boldText_to' => self::getSeaName($ship->getLocation()),
        'i18n' => ['tkn_boldText_shipName', 'tkn_boldText_from', 'tkn_boldText_to'],
      ];
    }

    self::notifyAll('moveShip', $text, array_merge([
      'player' => $player,
      'ship' => $ship->jsonSerialize(),
      'from' => $from,
      'tkn_boldText_shipName' => $ship->getName(),

    ], $textArgs));
  }

  public static function payCompanyExpenses($companyBalance)
  {
    self::notifyAll('moveCompanyBalance', clienttranslate('Company Balance is lowered to ${tkn_boldText_amount}'), [
      'tkn_boldText_amount' => '£' . $companyBalance,
      'companyBalance' => $companyBalance,
      'tkn_pound' => clienttranslate('Pounds'),
    ]);
  }

  public static function purchaseLocalAlliance(Player $player, ArmyPiece $armyPiece)
  {
    self::notifyAll('moveArmyPiece', clienttranslate('${player_name} purchases a local alliance with ${tkn_localAlliance}'), [
      'player' => $player,
      'armyPiece' => $armyPiece->jsonSerialize(),
      'tkn_localAlliance' => $armyPiece->getId(),
      'i18n' => [],
    ]);
  }

  public static function returnShipsToSupply(array $ships)
  {
    self::notifyAll('returnShipsToSupply', clienttranslate('All ${tkn_ship} are returned to the supply'), [
      'ships' => $ships,
      'tkn_ship' => self::tknShip($ships[0]),
    ]);
  }

  public static function returnShipToSupply(Ship $ship, ?Player $player = null)
  {
    $text =  clienttranslate('${tkn_ship} is returned to the supply');
    $args = [];

    if ($player !== null) {
      $text = clienttranslate('${player_name} returns the ${tkn_ship} to the supply');
      $args['player'] = $player;
    }

    self::notifyAll('returnShipsToSupply', $text, array_merge($args, [
      'ships' => [$ship->jsonSerialize()],
      'tkn_ship' => self::tknShip($ship),
    ]));
  }

  public static function addUnrest(Player | null $player, Region $region, int $change)
  {
    $text = clienttranslate('${tkn_boldText_change}${tkn_unrest} is added to ${tkn_boldText_region}');
    $textArgs = [];
    if ($player !== null) {
      $text = clienttranslate('Adds ${tkn_boldText_change}${tkn_unrest} to ${tkn_boldText_region}');
      $textArgs['player'] = $player;
    }

    self::updateRegion($region, $text, array_merge($textArgs, [
      'tkn_boldText_change' => $change,
      'tkn_boldText_region' => $region->getName(),
      'tkn_unrest' => self::tknUnrest(),
      'i18n' => ['tkn_boldText_region'],
    ]));
  }

  public static function removeUnrest(Region $region)
  {
    self::updateRegion($region, clienttranslate('All unrest in ${tkn_boldText_region} is removed'), [
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function revealLaw(Player $player, LawCard $law)
  {

    self::notifyAll('revealLaw', clienttranslate('${player_name} draw and reveals ${tkn_lawCard}'), [
      'player' => $player,
      'law' => $law->jsonSerialize(),
      'tkn_lawCard' => $law->getId(),
    ]);
  }

  public static function selectLaw(Player $player, LawCard $law)
  {
    $isDilemma = $law->isDilemma();

    $text = $isDilemma ? clienttranslate('Dilemma: ${player_name} must select ${tkn_lawCard}') : clienttranslate('${player_name} selects ${tkn_lawCard}');

    self::notifyAll('selectLaw', $text, [
      'player' => $player,
      'law' => $law->jsonSerialize(),
      'tkn_lawCard' => $law->getId(),
    ]);
  }

  public static function castVotes(Player $player, string $option, int $votes, int $money, int $support, ?Player $target, array $enterprises, array $londonSeasonCards)
  {
    $spendText = clienttranslate('${player_name} spends £${tkn_boldText_amount} ${enterpriseLog} ${londonSeasonCardLog}');
    if ($money === 0) {
      $spendText = clienttranslate('${player_name} spends ${enterpriseLog} ${londonSeasonCardLog}');
    }
    self::message($spendText, [
      'player' => $player,
      'tkn_boldText_amount' => $money,
      'enterpriseLog' => self::getEnterpriseLog($enterprises),
      'londonSeasonCardLog' => self::getLondonSeasonCardLog($londonSeasonCards),
    ]);

    $text = $target === null || $target->getId() === $player->getId() ? clienttranslate('${player_name} casts ${votes} vote(s) ${inFavorOrAgainst} the proposed law')
      : clienttranslate('${player_name} casts ${votes} vote(s) against the proposed law on behalf of ${player_name2}');

    self::notifyAll('castVotes', $text, [
      'player' => $player,
      'option' => $option,
      'votes' => $votes,
      'money' => $money,
      'support' => $support,
      'inFavorOrAgainst' => $option === IN_FAVOR ? clienttranslate('in favor of') : clienttranslate('against'),
      'player_name2' => $target === null ? '' : $target->getName(),
      'enterpriseIds' => Utils::returnIds($enterprises),
      'londonSeasonCardIds' => Utils::returnIds($londonSeasonCards),
      'opposition' => Parliament::getOpposition(),
    ]);
  }

  public static function commitToOpposition(Player $player, bool $commit, Player $votingPlayer, int $votes, array $opposition)
  {
    $text = $commit
      ? clienttranslate('${player_name} commits to the opposition')
      : clienttranslate('${player_name} does not commit to the opposition; ${votes} vote(s) are added to the opposition votes of ${player_name2}');

    self::notifyAll('commitToOpposition', $text, [
      'player' => $player,
      'commit' => $commit,
      'votes' => $votes,
      'player_name2' => $votingPlayer->getName(),
      'opposition' => $opposition,
    ]);
  }

  public static function seekShare(Player $player, FamilyMember $familyMember, int $amount)
  {
    self::notifyAll('seekShare', clienttranslate('${player_name} pays ${amount} ${tkn_pound} to seek a ${tkn_icon}'), [
      'player' => $player,
      'tkn_icon' => SHARE,
      'tkn_pound' => self::tknPound(),
      'amount' => $amount,
      'familyMember' => $familyMember,
    ]);
  }

  public static function selectPolicy(Player $player, int $dialPosition)
  {
    self::notifyAll('selectPolicy', clienttranslate('${player_name} selects ${policyLog}'), [
      'player' => $player,
      'dial' => $dialPosition,
      'policyLog' => self::getPolicyLog($dialPosition),
    ]);
  }

  public static function setupDone()
  {
    self::notifyAll('setupDone', '', []);
  }

  public static function setupFamilyMembers(Player $player, array $familyMembers)
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

  public static function swapPowerMarkers(Player $player, string $type, string $temp, array $changes)
  {
    self::notifyAll('swapPowerMarkers', clienttranslate('${player_name} swaps ${tkn_powerMarker} and ${tkn_powerMarker_swapped}'), [
      'player' => $player,
      'tkn_powerMarker' => $type,
      'tkn_powerMarker_swapped' => $temp,
      'changes' => $changes,
    ]);
  }

  public static function formEmpire(Region $region)
  {
    self::updateRegion($region, clienttranslate('The ${tkn_boldText_region} empire is formed'), [
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function shatterEmpire(Region $region)
  {
    self::updateRegion($region, clienttranslate('The ${tkn_boldText_region} empire shatters'), [
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function turn(int $turnNumber)
  {
    self::notifyAll('turn', clienttranslate('TURN ${turnNumber}'), [
      'turnNumber' => $turnNumber,
    ]);
  }

  public static function updateLondonSeasonOrder()
  {
    self::notifyAll('updateLondonSeasonOrder', '', [
      'order' => Prizes::getLondonSeasonOrder(),
      'cashSpent' => Globals::getRetirementMoney()
    ]);
  }

  public static function updateOpportunityMarker(Family $family, string | null $familyAction)
  {
    self::notifyAll('updateOpportunityMarker', '', [
      'familyId' => $family->getId(),
      'familyAction' => $familyAction,
    ]);
  }

  public static function updateTowerLevel(Region $region, int $change)
  {
    $text = '';
    if ($change === 1) {
      $text = clienttranslate('A tower level is added to ${tkn_boldText_region}');
    } else if ($change > 0) {
    } else if ($change === -1) {
      $text = clienttranslate('${tkn_boldText_region} loses a tower level');
    } else if ($change < 0) {
    }

    self::updateRegion($region, $text, [
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }

  public static function updateRegion(Region $region, string $text, array $textArgs = [])
  {
    self::notifyAll('updateRegion', $text, array_merge($textArgs, [
      'region' => $region->jsonSerialize(),
      'controlToken' => ControlTokens::getByRegion($region->getId())->jsonSerialize()
    ]));
  }

  public static function removeTower(Player $player, Region $region)
  {
    self::updateRegion($region, clienttranslate('${player_name} removes the tower from ${tkn_boldText_region}'), [
      'player_name' => $player->getName(),
      'tkn_boldText_region' => $region->getName(),
      'i18n' => ['tkn_boldText_region']
    ]);
  }
}
