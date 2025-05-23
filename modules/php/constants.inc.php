<?php
require_once 'gameoptions.inc.php';

const CROWN_PLAYER_ID = 1;

/**
 * Checks
 */
const SUCCESS = 'success';
const FAILURE = 'failure';
const CATASTROPHIC_FAILURE = 'catastrophicFailure';

/**
 * ScenarioIds
 */
const THE_1710_SCENARIO = 'The1710Scenario';
const THE_1758_SCENARIO = 'The1758Scenario';
const THE_1813_SCENARIO = 'The1813Scenario';
const THE_LONG_1710_SCENARIO = 'TheLong1710Scenario';

/**
 * Game options
 */
const OPTION_SCENARIO = 100;
const OPTION_SCENARIO_1710 = 1;
const OPTION_SCENARIO_1758 = 2;
const OPTION_SCENARIO_1813 = 3;
const OPTION_SCENARIO_LONG1710 = 4;

const SCENARIO_OPTION_SCENARIO_ID_MAP = [
  1 => THE_1710_SCENARIO,
  2 => THE_1758_SCENARIO,
  3 => THE_1813_SCENARIO,
  4 => THE_LONG_1710_SCENARIO
];

const OPTION_DRAFT_SETUP_CARDS = 101;
const OPTION_DRAFT_SETUP_CARDS_DISABLED = 0;
const OPTION_DRAFT_SETUP_CARDS_ENABLED = 1;

/**
 * Locations
 */
const DECK = 'deck';
const DISCARD = 'discard';
const EXTRA_SETUP = 'extraSetup';

const ST_SETUP_DRAFT = 19;
const ST_DRAFT_CARD = 20;
const ST_DRAFT_CARD_NEXT_STEP = 21;
const ST_PERFORM_SETUP = 22;
const ST_FAMILY_ACTION = 23;
const ST_NEW_COMPANY_SHARES = 24;
// Family Actions
const ST_ENLIST_WRITER = 25;
const ST_ENLIST_OFFICER = 26;
const ST_PURCHASE_LUXURY = 27;
const ST_PURCHASE_SHIPYARD = 28;
const ST_PURCHASE_WORKSHOP = 29;
const ST_SEEK_SHARE = 30;
const ST_CHAIRMAN = 40;
const ST_CHAIRMAN_DEBT_CONSENT = 41;

const ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY = 42;
const ST_DIRECTOR_OF_TRADE_TRANSFERS = 43;
const ST_MANAGER_OF_SHIPPING = 44;
const ST_DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS = 45;
const ST_MILITARY_AFFAIRS_TRANSFERS = 46;
const ST_MILITARY_AFFAIRS_ASSIGN = 47;
const ST_PRESIDENCY_DECIDE_ORDER = 49;
const ST_PRESIDENCY_TRADE = 50;
const ST_PRESIDENCY_TRADE_FILL_ORDERS = 51;

const ST_BONUSES = 60;
const ST_REVENUE_EXPENSES = 61;
const ST_REVENUE_EMERGENCY_LOANS = 62;
const ST_REVENUE_CHECK_EXPECTATIONS = 63;
const ST_REVENUE_ROYAL_PARDON = 64;
const ST_REVENUE_PAY_DIVIDENDS = 65;

const ST_EVENTS_IN_INDIA_STORMS = 70;
const ST_EVENTS_IN_INDIA_RESOLVE_EVENT = 71;
const ST_EVENTS_IN_INDIA_CRISIS_DEFENSE = 73;
const ST_FOREIGN_INVASION = 74;
const ST_FOREIGN_INVASION_END = 75;

const ST_PARLIAMENT_MEETS = 80;

const BONUSES = 'Bonuses';
const DRAFT_CARD = 'DraftCard';
const DRAFT_CARD_NEXT_STEP = 'DraftCardNextStep';
const EVENTS_IN_INDIA_CRISIS_DEFENSE = 'EventsInIndiaCrisisDefense';
const EVENTS_IN_INDIA_STORMS = 'EventsInIndiaStorms';
const EVENTS_IN_INDIA_RESOLVE_EVENT = 'EventsInIndiaResolveEvent';
const FAMILY_ACTION = 'FamilyAction';
const FOREIGN_INVASION_END = 'ForeignInvasionEnd';
const NEW_COMPANY_SHARES = 'NewCompanyShares';
const PARLIAMENT_MEETS = 'ParliamentMeets';
const PERFORM_SETUP = 'PerformSetup';
const REVENUE_EMERGENCY_LOANS = 'RevenueEmergencyLoans';
const REVENUE_EXPENSES = 'RevenueExpenses';
const REVENUE_CHECK_EXPECTATIONS = 'RevenueCheckExpectations';
const REVENUE_ROYAL_PARDON = 'RevenueRoyalPardon';
const REVENUE_PAY_DIVIDENDS = 'RevenuePayDividends';
// Family Actions
const ENLIST_WRITER = 'EnlistWriter';
const ENLIST_OFFICER = 'EnlistOfficer';
const PURCHASE_LUXURY = 'PurchaseLuxury';
const PURCHASE_SHIPYARD = 'PurchaseShipyard';
const PURCHASE_WORKSHOP = 'PurchaseWorkshop';
const SEEK_SHARE = 'SeekShare';
// Company Operations
const CHAIRMAN_DEBT_CONSENT = 'ChairmanDebtConsent';
const DIRECTOR_OF_TRADE_SPECIAL_ENVOY = 'DirectorOfTradeSpecialEnvoy';
const DIRECTOR_OF_TRADE_SPECIAL_ENVOY_SUCCESS = 'DirectorOfTradeSpecialEnvoySuccess';
const DIRECTOR_OF_TRADE_TRANSFERS = 'DirectorOfTradeTransfers';
const MILITARY_AFFAIRS_TRANSFERS = 'MilitaryAffairsTransfers';
const MILITARY_AFFAIRS_ASSIGN = 'MilitaryAffairsAssign';
const PRESIDENCY_DECIDE_ORDER = 'PresidencyDecideOrder';
const PRESIDENCY_TRADE = 'PresidencyTrade';
const PRESIDENCY_TRADE_FILL_ORDERS = 'PresidencyTradeFillOrders';


/**
 * Company
 */
const BALANCE = 'balance';
const DEBT = 'debt';
const STANDING = 'standing';

const COMPANY_EXPECTATIONS = [0, 4, 6, 8, 10, 12, 14, 16];

/**
 * Crown
 */
const CLIMATE = 'climate';

/**
 * Setup
 */
const OFFICE = 'office';
const COMPANY_SHARE = 'companyShare';
const CASH = 'cash';
const PRIME_MINISTER = 'primeMinister';
const RANDOM_BLACKMAIL_CARD = 'randomBlackmailCard';
const SHIP = 'ship';
const LUXURY = 'Luxury';
const WORKSHOP = 'Workshop';

const SHIPYARD = 'Shipyard';
const SHARE = 'Share';

const BLACKMAIL = 'Blackmail';
const PRESTIGE = 'Prestige';
const ENTERPRISE = 'Enterprise';
const SPOUSE = 'Spouse';

/**
 * Ship locations
 */
const WEST_INDIAN = 'westIndian';
const EAST_INDIAN = 'eastIndian';
const SOUTH_INDIAN = 'southIndian';
const UNFITTED = 'unfitted';

const SEA_ZONES = [
  WEST_INDIAN,
  SOUTH_INDIAN,
  EAST_INDIAN,
];

/**
 * Phases
 */
const SETUP = 'setup'; // Only used during start of game
const LONDON_SEASON = 'londonSeason';
const FAMILY = 'family'; // Also used for Prime Minister global
const FIRMS = 'firms';
const HIRING = 'hiring';
const REVENUE = 'revenue';
const EVENTS_IN_INDIA = 'eventsInIndia';
const UPKEEP_AND_REFRESH = 'upkeepAndRefresh';

/**
 * Families
 */
const BENYON = 'Benyon';
const HASTINGS = 'Hastings';
const LARKINS = 'Larkins';
const PAXTON = 'Paxton';
const SYKES = 'Sykes';
const WALSH = 'Walsh';

const FAMILIES = [
  BENYON,
  HASTINGS,
  LARKINS,
  PAXTON,
  SYKES,
  WALSH,
];

const CROWN = 'Crown';

/**
 * Colors
 */
const BLUE = 'blue';
const GRAY = 'gray';
const GREEN = 'green';
const PINK = 'pink';
const PURPLE = 'purple';
const YELLOW = 'yellow';
const RED = 'red'; // The crown

const HEX_COLOR_COLOR_MAP = [
  '99dae9' => BLUE,
  'dbd9d6' => GRAY,
  'addb90' => GREEN,
  'ffb1b9' => PINK,
  'c7b4e1' => PURPLE,
  'f9e08d' => YELLOW,
  'bd1f35' => RED,
];

const COLOR_FAMILY_MAP = [
  PINK => BENYON,
  BLUE => HASTINGS,
  YELLOW => LARKINS,
  GRAY => PAXTON,
  PURPLE => SYKES,
  GREEN => WALSH,
  RED => CROWN,
];

const FAMILY_COLOR_MAP = [
  BENYON => PINK,
  HASTINGS => BLUE,
  LARKINS => YELLOW,
  PAXTON => GRAY,
  SYKES => PURPLE,
  WALSH => GREEN,
  CROWN => RED,
];

/**
 * Offices
 */
const CHAIRMAN = 'Chairman';
const DIRECTOR_OF_TRADE = 'DirectorOfTrade';
const MANAGER_OF_SHIPPING = 'ManagerOfShipping';
const MILITARY_AFFAIRS = 'MilitaryAffairs';
const PRESIDENT_OF_BOMBAY = 'PresidentOfBombay';
const PRESIDENT_OF_MADRAS = 'PresidentOfMadras';
const PRESIDENT_OF_BENGAL = 'PresidentOfBengal';
const GOVERNOR_GENERAL = 'GovernorGeneral';
const SUPERINTENDENT_OF_TRADE_IN_CHINA = 'SuperintendentOfTradeInChina';
const GOVERNOR_OF_BOMBAY = 'GovernorOfBombay';
const GOVERNOR_OF_MADRAS = 'GovernorOfMadras';
const GOVERNOR_OF_BENGAL = 'GovernorOfBengal';
const GOVERNOR_OF_PUNJAB = 'GovernorOfPunjab';
const GOVERNOR_OF_DELHI = 'GovernorOfDelhi';
const GOVERNOR_OF_MARATHA = 'GovernorOfMaratha';
const GOVERNOR_OF_HYDERABAD = 'GovernorOfHyderabad';
const GOVERNOR_OF_MYSORE = 'GovernorOfMysore';

const OFFICES = [
  CHAIRMAN,
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  MILITARY_AFFAIRS,
  PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS,
  PRESIDENT_OF_BENGAL,
  GOVERNOR_GENERAL,
  SUPERINTENDENT_OF_TRADE_IN_CHINA,
  GOVERNOR_OF_BOMBAY,
  GOVERNOR_OF_MADRAS,
  GOVERNOR_OF_BENGAL,
  GOVERNOR_OF_PUNJAB,
  GOVERNOR_OF_DELHI,
  GOVERNOR_OF_MARATHA,
  GOVERNOR_OF_HYDERABAD,
  GOVERNOR_OF_MYSORE,
];

// TODO: check how to handle director of trade and governor general
const OFFICES_WITH_TREASURY = [
  DIRECTOR_OF_TRADE,
  MANAGER_OF_SHIPPING,
  PRESIDENT_OF_BOMBAY,
  PRESIDENT_OF_MADRAS,
  PRESIDENT_OF_BENGAL,
];

/**
 * Family member positions
 */
const COMMANDER = 'Commander';
const OFFICER = 'Officer';
const OFFICER_IN_TRAINING = 'OfficerInTraining';
const WRITER = 'Writer';

const COURT_OF_DIRECTORS = 'CourtOfDirectors';

/**
 * Borders
 */
const BENGAL_DELHI_BORDER = 'Bengal_Delhi_border';
const BENGAL_MARATHA_BORDER = 'Bengal_Maratha_border';
const BOMBAY_DELHI_BORDER = 'Bombay_Delhi_border';
const BOMBAY_HYDERABAD_BORDER = 'Bombay_Hyderabad_border';
const BOMBAY_MARATHA_BORDER = 'Bombay_Maratha_border';
const BOMBAY_MYSORE_BORDER = 'Bombay_Mysore_border';
const BOMBAY_PUNJAB_BORDER = 'Bombay_Punjab_border';
const DELHI_MARATHA_BORDER = 'Delhi_Maratha_border';
const DELHI_PUNJAB_BORDER = 'Delhi_Punjab_border';
const HYDERABAD_MADRAS_BORDER = 'Hyderabad_Madras_border';
const HYDERABAD_MARATHA_BORDER = 'Hyderabad_Maratha_border';
const HYDERABAD_MYSORE_BORDER = 'Hyderabad_Mysore_border';
const MADRAS_MYSORE_BORDER = 'Madras_Mysore_border';


const BORDERS = [
  BENGAL_DELHI_BORDER,
  BENGAL_MARATHA_BORDER,
  BOMBAY_DELHI_BORDER,
  BOMBAY_HYDERABAD_BORDER,
  BOMBAY_MARATHA_BORDER,
  BOMBAY_MYSORE_BORDER,
  BOMBAY_PUNJAB_BORDER,
  DELHI_MARATHA_BORDER,
  DELHI_PUNJAB_BORDER,
  HYDERABAD_MADRAS_BORDER,
  HYDERABAD_MARATHA_BORDER,
  HYDERABAD_MYSORE_BORDER,
  MADRAS_MYSORE_BORDER,
];

/**
 * RegionIds
 */
const BENGAL = 'Bengal';
const BOMBAY = 'Bombay';
const DELHI = 'Delhi';
const HYDERABAD = 'Hyderabad';
const MADRAS = 'Madras';
const MARATHA = 'Maratha';
const MYSORE = 'Mysore';
const PUNJAB = 'Punjab';

const REGIONS = [
  BENGAL,
  BOMBAY,
  DELHI,
  HYDERABAD,
  MADRAS,
  MARATHA,
  MYSORE,
  PUNJAB,
];

const BORDERS_CONNECTED_REGIONS_MAP = [
  BENGAL_DELHI_BORDER => [BENGAL, DELHI],
  BENGAL_MARATHA_BORDER => [BENGAL, MARATHA],
  BOMBAY_DELHI_BORDER => [BOMBAY, DELHI],
  BOMBAY_HYDERABAD_BORDER => [BOMBAY, HYDERABAD],
  BOMBAY_MARATHA_BORDER => [BOMBAY, MARATHA],
  BOMBAY_MYSORE_BORDER => [BOMBAY, MYSORE],
  BOMBAY_PUNJAB_BORDER => [BOMBAY, PUNJAB],
  DELHI_MARATHA_BORDER => [DELHI, MARATHA],
  DELHI_PUNJAB_BORDER => [DELHI, PUNJAB],
  HYDERABAD_MADRAS_BORDER => [HYDERABAD, MADRAS],
  HYDERABAD_MARATHA_BORDER => [HYDERABAD, MARATHA],
  HYDERABAD_MYSORE_BORDER => [HYDERABAD, MYSORE],
  MADRAS_MYSORE_BORDER => [MADRAS, MYSORE],
];

const HOME_REGIONS = [
  BENGAL,
  BOMBAY,
  MADRAS,
];

const BENGAL_PRESIDENCY = 'BengalPresidency';
const BOMBAY_PRESIDENCY = 'BombayPresidency';
const MADRAS_PRESIDENCY = 'MadrasPresidency';

const PRESIDENCIES = [
  BENGAL_PRESIDENCY,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
];

const PRESIDENCY_HOME_REGION_MAP = [
  BENGAL_PRESIDENCY => BENGAL,
  BOMBAY_PRESIDENCY => BOMBAY,
  MADRAS_PRESIDENCY => MADRAS,
];

const BENGAL_ARMY = 'Army_Bengal';
const BOMBAY_ARMY = 'Army_Bombay';
const MADRAS_ARMY = 'Army_Madras';

const ARMIES = [BENGAL_ARMY, BOMBAY_ARMY, MADRAS_ARMY];

const ARMY_REGION_MAP = [
  BENGAL_ARMY => BENGAL,
  BOMBAY_ARMY => BOMBAY,
  MADRAS_ARMY => MADRAS,
];

const BENGAL_WRITERS = 'Writers_Bengal';
const BOMBAY_WRITERS = 'Writers_Bombay';
const MADRAS_WRITERS = 'Writers_Madras';

/**
 * Shapes on map
 */
const CIRCLE = 'circle';
const SQUARE = 'square';
const TRIANGLE = 'triangle';

/**
 * OrderIds
 */
const ORDER_PUNJAB_1 = 'Order_Punjab_1';
const ORDER_DELHI_1 = 'Order_Delhi_1';
const ORDER_DELHI_2 = 'Order_Delhi_2';
const ORDER_DELHI_3 = 'Order_Delhi_3';
const ORDER_BENGAL_1 = 'Order_Bengal_1';
const ORDER_BENGAL_2 = 'Order_Bengal_2';
const ORDER_BOMBAY_1 = 'Order_Bombay_1';
const ORDER_BOMBAY_2 = 'Order_Bombay_2';
const ORDER_BOMBAY_3 = 'Order_Bombay_3';
const ORDER_MARATHA_1 = 'Order_Maratha_1';
const ORDER_MARATHA_2 = 'Order_Maratha_2';
const ORDER_MARATHA_3 = 'Order_Maratha_3';
const ORDER_HYDERABAD_1 = 'Order_Hyderabad_1';
const ORDER_MYSORE_1 = 'Order_Mysore_1';
const ORDER_MYSORE_2 = 'Order_Mysore_2';
const ORDER_MADRAS_1 = 'Order_Madras_1';
const ORDER_MADRAS_2 = 'Order_Madras_2';

const ORDERS = [
  ORDER_PUNJAB_1,
  ORDER_DELHI_1,
  ORDER_DELHI_2,
  ORDER_DELHI_3,
  ORDER_BENGAL_1,
  ORDER_BENGAL_2,
  ORDER_BOMBAY_1,
  ORDER_BOMBAY_2,
  ORDER_BOMBAY_3,
  ORDER_MARATHA_1,
  ORDER_MARATHA_2,
  ORDER_MARATHA_3,
  ORDER_HYDERABAD_1,
  ORDER_MYSORE_1,
  ORDER_MYSORE_2,
  ORDER_MADRAS_1,
  ORDER_MADRAS_2,
];

/**
 * Order status
 */
const CLOSED = 'closed';
const FILLED = 'filled';
const FILLED_BY_WRITER = 'filledByWriter';
const OPEN = 'open';

/**
 * Ship types
 */
const PLAYER_OWNED_SHIP = 'playerOwnedShip';
// Capitalized because these are used to derive class names
const COMPANY_SHIP = 'CompanyShip';
const EXTRA_SHIP = 'ExtraShip';

const SUPPLY_OTHER_SHIPS = 'supply_otherShips';
const SUPPLY_PLAYER_SHIPS = 'supply_playerShips';
const SUPPLY_REGIMENTS = 'supply_regiments';

/**
 * Player owned ship names
 */
const ATLAS = 'Atlas';
const BRITANNIA = 'Britannia';
const CONSTANT_FRIEND = 'ConstantFriend';
const DILIGENCE = 'Diligence';
const ELIZA = 'Eliza';
const FORTITUDE = 'Fortitude';
const GANGES = 'Ganges';
const HAMPSHIRE = 'Hampshire';
const INDEFATIGABLE = 'Indefatigable';
const JAMES = 'James';
const KING_GEORGE = 'KingGeorge';
const LADY_FLORA = 'LadyFlora';
const NEPTUNE = 'Neptune';
const OBRA_DINN = 'ObraDinn';
const QUEEN_CHARLOTTE = 'QueenCharlotte';
const RECOVERY = 'Recovery';
const SAMARITAN = 'Samaritan';
const THISTLEWORTH = 'Thistleworth';
const UNION = 'Union';
const WALPOLE = 'Walpole';
const YORK = 'York';
const ZENOBIA = 'Zenobia';

const SHIP_NAMES = [
  ATLAS,
  BRITANNIA,
  CONSTANT_FRIEND,
  DILIGENCE,
  ELIZA,
  FORTITUDE,
  GANGES,
  HAMPSHIRE,
  INDEFATIGABLE,
  JAMES,
  KING_GEORGE,
  LADY_FLORA,
  NEPTUNE,
  OBRA_DINN,
  QUEEN_CHARLOTTE,
  RECOVERY,
  SAMARITAN,
  THISTLEWORTH,
  UNION,
  WALPOLE,
  YORK,
  ZENOBIA,
];

/**
 * Army Pieces
 */
const REGIMENT = 'Regiment';
const LOCAL_ALLIANCE = 'LocalAlliance';
// Bengal
const AWADH = 'Awadh';
const JAGAT_SETHS = 'JagatSeths';
const ORISSA = 'Orissa';
// Madras
const THE_NIZAM = 'TheNizam';
const ARCOT = 'Arcot';
// Bombay
const RAJPUT_PRINCE = 'RajputPrince';
const SIKHS = 'Sikhs';

const LOCAL_ALLIANCES = [
  AWADH,
  JAGAT_SETHS,
  ORISSA,
  THE_NIZAM,
  ARCOT,
  RAJPUT_PRINCE,
  SIKHS,
];

/**
 * Power tokens
 */
const POWER_TOKEN_COMPANY_SHARE = 'companyShare';
const POWER_TOKEN_MANUFACTURING = 'manufacturing';
const POWER_TOKEN_SHIPPING = 'shipping';
const POWER_TOKEN_SOCIAL = 'social';

const SHARE_VICTORY_POINTS_TOKEN = 'shareVictoryPoints';

/**
 * Crown climates
 */
const BULL = 'Bull';
const STAG = 'Stag';
const LION = 'Lion';
const BEAR = 'Bear';
const PEACOCK = 'Peacock';

/**
 * Directions
 */
const CLOCKWISE = 'clockwise';
const COUNTER_CLOCKWISE = 'counterClockwise';

/**
 * Stock Exchange locations
 */
const STOCK_EXCHANGE_2 = 'StockExchange_2';
const STOCK_EXCHANGE_3_LEFT = 'StockExchange_3_Left';
const STOCK_EXCHANGE_3_RIGHT = 'StockExchange_3_Right';
const STOCK_EXCHANGE_4 = 'StockExchange_4';
const STOCK_EXCHANGE_5 = 'StockExchange_5';

const STOCK_EXCHANGE_POSITIONS = [
  STOCK_EXCHANGE_5,
  STOCK_EXCHANGE_4,
  STOCK_EXCHANGE_3_RIGHT,
  STOCK_EXCHANGE_3_LEFT,
  STOCK_EXCHANGE_2,
];

/**
 * Other
 */
const TRADE = 'trade';
const DONE = 'done';

/**
 * Event Types
 */
const FOREIGN_INVASION = 'ForeignInvasion'; // Doubles as action name
const LEADER = 'Leader';
const PEACE = 'Peace';
const CRISIS = 'Crisis';
const SHUFFLE = 'Shuffle';
const TURMOIL = 'Turmoil';
const WINDFALL = 'Windfall';

const LOCATION = 'location';
const FACING = 'facing';


/**
 * Storm Die
 */
const FOUR = 'four';
const TWO_EAST = 'twoEast';
const TWO_WEST = 'twoWest';
const THREE_SOUTH = 'threeSouth';
const ONE_ALL = 'oneAll';

const STORM_DIE = [FOUR, TWO_EAST, ONE_ALL, THREE_SOUTH, TWO_WEST, FOUR];

/**
 * Prime Minister
 */
const DIAL = 'dial';
const BONUS = 'bonus';
const POWER = 'power';
const TAX = 'tax';
const START_SCENARIO = 'startScenario';
const TYPE = 'type';
const TARGET = 'target';
const WINDOW_TAX = 'windowTax';

const PRIME_MINISTER_DIAL = [
  [
    TYPE => POWER,
    TARGET => WORKSHOP,
    START_SCENARIO => 1710,
  ],
  [
    TYPE => TAX,
    TARGET => SHARE,
  ],
  [
    TYPE => POWER,
    TARGET => SHIPYARD,
  ],
  [
    TYPE => TAX,
    TARGET => LUXURY,
    WINDOW_TAX => true,
  ],
  [
    TYPE => POWER,
    TARGET => SHARE,
  ],
  [
    TYPE => BONUS,
    TARGET => WORKSHOP,
  ],
  [
    TYPE => POWER,
    TARGET => SHIPYARD,
    START_SCENARIO => 1758,
  ],
  [
    TYPE => POWER,
    TARGET => LUXURY,
  ],
  [
    TYPE => TAX,
    TARGET => SHIPYARD,
    WINDOW_TAX => true,
  ],
  [
    TYPE => BONUS,
    TARGET => SHARE,
  ],
  [
    TYPE => TAX,
    TARGET => WORKSHOP,
    START_SCENARIO => 1813,
  ],
  [
    TYPE => BONUS,
    TARGET => WORKSHOP,
  ],
  [
    TYPE => TAX,
    TARGET => LUXURY,
    WINDOW_TAX => true,
  ],
  [
    TYPE => TAX,
    TARGET => SHIPYARD,
  ],
];
