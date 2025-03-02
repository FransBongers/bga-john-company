<?php
require_once 'gameoptions.inc.php';

const CROWN_PLAYER_ID = 1;

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
const ST_PURCHASE_ENTERPRISE = 27;
const ST_SEEK_SHARE = 28;
const ST_CHAIRMAN = 40;


const DRAFT_CARD = 'DraftCard';
const DRAFT_CARD_NEXT_STEP = 'DraftCardNextStep';
const PERFORM_SETUP = 'PerformSetup';
const FAMILY_ACTION = 'FamilyAction';
const NEW_COMPANY_SHARES = 'NewCompanyShares';
// Family Actions
const ENLIST_WRITER = 'EnlistWriter';
const ENLIST_OFFICER = 'EnlistOfficer';
const PURCHASE_ENTERPRISE = 'PurchaseEnterprise';
const PURCHASE_LUXURY = 'PurchaseLuxury';
const PURCHASE_SHIPYARD = 'PurchaseShipyard';
const PURCHASE_WORKSHOP = 'PurchaseWorkshop';
const SEEK_SHARE = 'SeekShare';


/**
 * Company
 */
const BALANCE = 'balance';
const DEBT = 'debt';
const STANDING = 'standing';

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

/**
 * Phases
 */
const SETUP = 'setup'; // Only used during start of game
const LONDON_SEASON = 'londonSeason';
const FAMILY = 'family';
const FIRMS = 'firms';
const HIRING = 'hiring';

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
const SUPERINTENDENT_OF_TRADE_IN_CHINE = 'SuperintendentOfTradeInChina';
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
  SUPERINTENDENT_OF_TRADE_IN_CHINE,
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

const BENGAL_PRESIDENCY = 'BengalPresidency';
const BOMBAY_PRESIDENCY = 'BombayPresidency';
const MADRAS_PRESIDENCY = 'MadrasPresidency';

const PRESIDENCIES = [
  BENGAL_PRESIDENCY,
  BOMBAY_PRESIDENCY,
  MADRAS_PRESIDENCY,
];


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
