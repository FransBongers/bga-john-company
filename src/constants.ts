/**
 * Var names
 */
const BOARD_SCALE = 'boardScale';

const PLUS = 'plus';
const MINUS = 'minus';

const DONE = 'done';
const TRADE = 'trade';

/**
 * Families
 */
const BENYON = 'Benyon';
const HASTINGS = 'Hastings';
const LARKINS = 'Larkins';
const PAXTON = 'Paxton';
const SYKES = 'Sykes';
const WALSH = 'Walsh';

const CROWN = 'Crown';
const CROWN_PLAYER_ID = 1;

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

const HEX_COLOR_COLOR_MAP = {
  '99dae9': BLUE,
  dbd9d6: GRAY,
  addb90: GREEN,
  ffb1b9: PINK,
  c7b4e1: PURPLE,
  f9e08d: YELLOW,
  // 'bd1f35': RED,
};

const COLOR_FAMILY_MAP = {
  [PINK]: BENYON,
  [BLUE]: HASTINGS,
  [YELLOW]: LARKINS,
  [GRAY]: PAXTON,
  [PURPLE]: SYKES,
  [GREEN]: WALSH,
  // RED: CROWN,
};

/**
 * Phases
 */
const SETUP = 'setup'; // Only used during start of game
const LONDON_SEASON = 'londonSeason';
const FAMILY = 'family';
const FIRMS = 'firms';
const HIRING = 'hiring';
const BONUSES = 'Bonuses';
const REVENUE = 'revenue';
const EVENTS_IN_INDIA = 'eventsInIndia';
const PARLIAMENT_MEETS = 'ParliamentMeets';
const UPKEEP_AND_REFRESH = 'upkeepAndRefresh';

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

/**
 * Counters
 */
const FAMILY_MEMBERS_COUNTER = 'familyMembers';
const CASH_COUNTER = 'cash';
const SHIPS_COUNTER = 'ships';
const SHARES_COUNTER = 'shares';
const WORKSHOPS_COUNTER = 'workshops';
const SHIPYARDS_COUNTER = 'shipyards';
const LUXURIES_COUNTER = 'luxuries';
const PROMISE_CUBES_COUNTER = 'promiseCubes';

const COUNTERS = [
  FAMILY_MEMBERS_COUNTER,
  CASH_COUNTER,
  SHIPS_COUNTER,
  SHARES_COUNTER,
  WORKSHOPS_COUNTER,
  SHIPYARDS_COUNTER,
  LUXURIES_COUNTER,
];

/**
 * Order status
 */
const CLOSED = 'closed';
const FILLED = 'filled';
const OPEN = 'open';

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

const OFFICES_WITH_TREASURY = [
  DIRECTOR_OF_TRADE,
  // GOVERNOR_GENERAL,
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

/**
 * Presidencis
 */
const BENGAL_PRESIDENCY = 'BengalPresidency';
const BOMBAY_PRESIDENCY = 'BombayPresidency';
const MADRAS_PRESIDENCY = 'MadrasPresidency';

const PRESIDENCIES = [BENGAL_PRESIDENCY, BOMBAY_PRESIDENCY, MADRAS_PRESIDENCY];

const BENGAL_WRITERS = 'Writers_Bengal';
const BOMBAY_WRITERS = 'Writers_Bombay';
const MADRAS_WRITERS = 'Writers_Madras';

const WRITER_LOCATIONS = [BENGAL_WRITERS, BOMBAY_WRITERS, MADRAS_WRITERS];

const BENGAL_ARMY = 'Army_Bengal';
const BOMBAY_ARMY = 'Army_Bombay';
const MADRAS_ARMY = 'Army_Madras';

const ARMIES = [BENGAL_ARMY, BOMBAY_ARMY, MADRAS_ARMY];

const ARMY_REGION_MAP = {
  [BENGAL_ARMY]: BENGAL,
  [BOMBAY_ARMY]: BOMBAY,
  [MADRAS_ARMY]: MADRAS,
};

/**
 * Ship locations
 */
const WEST_INDIAN = 'westIndian';
const EAST_INDIAN = 'eastIndian';
const SOUTH_INDIAN = 'southIndian';
const CHINA = 'china';
const UNFITTED = 'unfitted';

const SEA_ZONES = [WEST_INDIAN, EAST_INDIAN, SOUTH_INDIAN];

/**
 * Ship types
 */
const COMPANY_SHIP = 'CompanyShip';
const EXTRA_SHIP = 'ExtraShip';

/**
 * Power tokens
 */
const POWER_TOKEN_COMPANY_SHARE = 'companyShare';
const POWER_TOKEN_MANUFACTURING = 'manufacturing';
const POWER_TOKEN_SHIPPING = 'shipping';
const POWER_TOKEN_SOCIAL = 'social';

const SHARE_VICTORY_POINTS_TOKEN = 'shareVictoryPoints';

const POWER_TOKENS = [
  POWER_TOKEN_COMPANY_SHARE,
  POWER_TOKEN_MANUFACTURING,
  POWER_TOKEN_SHIPPING,
  POWER_TOKEN_SOCIAL,
];

const POWER_TOKEN_ICON_MAP = {
  [POWER_TOKEN_COMPANY_SHARE]: SHARE,
  [POWER_TOKEN_MANUFACTURING]: WORKSHOP,
  [POWER_TOKEN_SHIPPING]: SHIPYARD,
  [POWER_TOKEN_SOCIAL]: LUXURY,
};

/**
 * Family Actions
 */
const ENLIST_WRITER = 'EnlistWriter';
const ENLIST_OFFICER = 'EnlistOfficer';
const PURCHASE_LUXURY = 'PurchaseLuxury';
const PURCHASE_SHIPYARD = 'PurchaseShipyard';
const PURCHASE_WORKSHOP = 'PurchaseWorkshop';
const SEEK_SHARE = 'SeekShare';
const PURCHASE_ENTERPRISE = 'PurchaseEnterprise';

/**
 * Stock Exchange locations
 */
const STOCK_EXCHANGE_2 = 'StockExchange_2';
const STOCK_EXCHANGE_3_LEFT = 'StockExchange_3_Left';
const STOCK_EXCHANGE_3_RIGHT = 'StockExchange_3_Right';
const STOCK_EXCHANGE_4 = 'StockExchange_4';
const STOCK_EXCHANGE_5 = 'StockExchange_5';

const STOCK_EXCHANGE_POSITIONS = [
  STOCK_EXCHANGE_2,
  STOCK_EXCHANGE_3_LEFT,
  STOCK_EXCHANGE_3_RIGHT,
  STOCK_EXCHANGE_4,
  STOCK_EXCHANGE_5,
];

/**
 * Crown climates
 */
const BULL = 'Bull';
const STAG = 'Stag';
const LION = 'Lion';
const BEAR = 'Bear';
const PEACOCK = 'Peacock';

const CROWN_CLIMATE = [BULL, STAG, LION, BEAR, PEACOCK];

const BUY_COMPANY_SHIP = 'BUY_COMPANY_SHIP';
const DO_NOT_BUY_COMPANY_SHIP = 'BUY_COMPANY_SHIP';
const BUY_AS_MANY_SHIPS_AS_YOU_WISH = 'BUY_AS_MANY_SHIPS_AS_YOU_WISH';
